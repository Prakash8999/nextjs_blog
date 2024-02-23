'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { notFound, useParams } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import EditorJS from '@editorjs/editorjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter } from 'next/navigation'


import { useForm } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'
import { z } from 'zod'



import { useMutation } from '@tanstack/react-query'
import { Toaster, toast } from 'sonner'
import Spinner from '../Loading'
import { PostValidator, PostCreationRequest } from '../../../validators/post'
import { uploadFiles } from '../../../helpers/uploadthing'
// import Spinner from './Loading'


type FormData = z.infer<typeof PostValidator>

const EditPost = ({ session }: { session: any }) => {

	const [cover, setCoverPhoto] = useState<string>('');
	const [coverLoading, setCoverLoading] = useState<boolean>(false)
	const [tags, setTags] = useState<string>('')
	const [title, setTitle] = useState<string>('')
	const [editorContent, setEditorContent] = useState<any>(null);
	const { id } = useParams()
	const fetchData = async () => {
		const { data } = await axios.get(`/api/readpost/${id}`)

		return data
	}
	const { data, isError, isLoading } = useQuery({ queryKey: ['edit'], queryFn: fetchData, staleTime: 0 })
	// console.log(data);



	const {
		register,
		handleSubmit,
		
		formState: { errors },
		reset
	} = useForm<FormData>({
		resolver: zodResolver(PostValidator),
		defaultValues: {

			title: title,
			content: null,
			publish: true,
			draft: false,
			coverPhoto: '',
			tags: tags

		},
	})



	const ref = useRef<EditorJS>()
	// const _titleRef = useRef<HTMLTextAreaElement>(null)
	const _coverRef = useRef<HTMLImageElement>(null)
	const router = useRouter()
	const [isMounted, setIsMounted] = useState<boolean>(false)
	const pathname = usePathname()
	const [isDraftLoading, setIsDraftLoading] = useState(false)
	const { mutate: updatePost, isPending } = useMutation({
		mutationFn: async ({
			title,
			content,
			publish,
			draft,
			coverPhoto,
			tags

		}: PostCreationRequest) => {
			const payload: PostCreationRequest = { title, content, publish, draft, coverPhoto, tags }
			const { data } = await axios.patch(`/api/updatepost/${id}`, payload)
			return data
		},
		onError: (err) => {

			console.log(err);



		},

		onSuccess: (res) => {

			console.log(res)

			router.refresh()

			// location.reload()
			return toast.success('Post submitted successfully')
		},


	})




	const { mutate: createDraft } = useMutation({
		mutationFn: async ({
			title,
			content,
			publish,
			draft,
			coverPhoto,
			tags,
		}: PostCreationRequest) => {
			setIsDraftLoading(true)
			const payload: PostCreationRequest = { title, content, publish, draft, coverPhoto, tags }
			const { data } = await axios.patch(`/api/updatepost/${id}`, payload)
			return data
		},
		onError: (err) => {

			console.log(err);
			setIsDraftLoading(false)


		},

		onSuccess: (res) => {

			console.log(res)

			router.refresh()

			// location.reload()
			setIsDraftLoading(false)
			return toast.success('Post save as draft successfully')
		},


	})
	const initializeEditor = useCallback(async (reset: any) => {
		const { data } = await axios.get(`/api/readpost/${id}`);
		const EditorJS = (await import('@editorjs/editorjs')).default
		const Header = (await import('@editorjs/header')).default
		const Embed = (await import('@editorjs/embed')).default
		const Table = (await import('@editorjs/table')).default
		const List = (await import('@editorjs/list')).default
		const Code = (await import('@editorjs/code')).default
		const LinkTool = (await import('@editorjs/link')).default
		const InlineCode = (await import('@editorjs/inline-code')).default
		const ImageTool = (await import('@editorjs/image')).default
		if (data) {
			// reset({
				// title: data?.post?.title,

			// 	// Populate other fields if needed
			// });
			setCoverPhoto(data?.post?.coverPhoto ? data?.post?.coverPhoto : cover);


			setTitle(data?.post?.title)
			if (!ref.current) {
				const editor = new EditorJS({
					holder: 'editor',
					onReady() {
						ref.current = editor
					},
					placeholder: 'Type here to write your post...',
					inlineToolbar: true,
					data: data?.post?.content || { blocks: [] },
					tools: {
						header: Header,
						linkTool: {
							class: LinkTool,
							config: {
								endpoint: '/api/link',
							},
						},
						image: {
							class: ImageTool,
							config: {
								uploader: {
									async uploadByFile(file: File) {


										// const [res] = await uploadFiles([File], 'imageUploader')
										const [res] = await uploadFiles([file], 'imageUploader')

										return {
											success: 1,
											file: {
												url: res.fileUrl,
											},
										}
									},
								},
							},
						},
						list: List,
						code: Code,
						inlineCode: InlineCode,
						table: Table,
						embed: Embed,
					},
				})
			}
		}



	}, [])





	useEffect(() => {
		if (Object.keys(errors).length) {
			for (const [_key, value] of Object.entries(errors)) {
				value
				// toast({
				//   title: 'Something went wrong.',
				//   description: (value as { message: string }).message,
				//   variant: 'destructive',
				// })
				console.log(errors);

				toast.error(errors?.title?.message)
			}
		}
	}, [errors])

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setIsMounted(true)
		}
	}, [])

	useEffect(() => {
		const init = async () => {
			await initializeEditor(reset)

			setTimeout(() => {
				// _titleRef?.current?.focus()
			}, 2000)
		}

		if (isMounted) {
			init()

			return () => {
				ref.current?.destroy()
				ref.current = undefined
			}
		}
	}, [isMounted, initializeEditor, id, reset])

	async function onUpdate(data: FormData) {
		console.log(data.coverPhoto);

		const blocks = await ref.current?.save()

		const payload: PostCreationRequest = {
			title: title,
			content: blocks,
			publish: true,
			draft: false,
			coverPhoto: cover,
			tags: tags

		}

		updatePost(payload)
	}
	async function onDraft(data: FormData) {
		const blocks = await ref.current?.save()

		const payload: PostCreationRequest = {
			title: title,
			content: blocks,
			publish: false,
			draft: true,
			coverPhoto: cover,
			tags: tags
		}

		createDraft(payload)
	}

	if (!isMounted) {
		return null
	}

	// const { ref: titleRef, ...rest } = register('title')
	const { ref: coverRef, ...restCover } = register('coverPhoto')


	const uploadCoverPhoto = async (file: File) => {
		setCoverLoading(true)
		try {
			const [res] = await uploadFiles([file], 'imageUploader')
			console.log(res);
			setCoverLoading(false)
			// Update cover photo state
			setCoverPhoto(res.fileUrl);
		} catch (error) {
			console.error(error);
		}
	};


	if (isLoading) {
		return <h1>Loading...</h1>
	}

	if (data?.post?.author?.id != session?.id) {
		return notFound()
	}

// console.log(title);


	return (
		<>

			<div className='w-full flex justify-center gap-x-5 p-4 bg-zinc-100	rounded-lg border border-zinc-200'>
				<form
					id='subreddit-post-form '
					className='md:w-3/5 w-[95vw]  rounded-md p-4  bg-white text-black shadow-md'
				// onUpdate={handleSubmit(onUpdate)}
				>
					<div className='prose prose-stone dark:prose-invert'>
						{/* <div className='flex  gap-x-3 pb-4'>
            <p>
              Cover Photo
            </p>

            <input type="image" accept="image/png, image/jpeg"  ref={(e) => {
              coverRef(e)
              // @ts-ignore
              _coverRef.current = e

            }} 
            {...restCover}
            />

            <button >Upload</button>
          </div> */}


						<div className='flex gap-x-4 pb-3 flex-row '>
							<p>Cover Photo:</p>
							<input
								type='file'
								accept='image/png, image/jpeg'
								className=''
								placeholder='Choose Cover Photo'


								onChange={(e) => uploadCoverPhoto(e.target.files![0])}
							/>
							<div>

								{
									coverLoading ? <Spinner className='w-8 h-8 ml-8' /> : ''
								}

							</div>

						</div>

						{cover && (
							<div className='pb-3'>
								<p className='text-sm'>Selected Cover Photo:</p>
								<img src={cover} alt='Cover' className='h-[52vh] border border-gray-300 p-1 object-cover w-[70vh] ' />
							</div>
						)}


{/* 
						<TextareaAutosize
								// value={data?.post?.title}
								// value={data?.post?.title}
								// onChange={ (e) => setTitle(e.target.value)}
								defaultValue={data?.post?.title}
							ref={(e) => {
								titleRef(e)
								// @ts-ignore
								_titleRef.current = e
							}}
							{...rest}
							placeholder='Title'
							className='w-full h-12 resize-none py-2 pl-1 appearance-none overflow-hidden bg-transparent text-xl font-semibold border outline-none outline focus:border-black placeholder:font-normal rounded-md'
						/> */}

						 <TextareaAutosize
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder='Title'
							className='w-full h-12 resize-none py-2 pl-1 appearance-none overflow-hidden bg-transparent text-xl font-semibold border outline-none outline focus:border-black placeholder:font-normal rounded-md'
						/> 

						<div className=' py-2 shadow-sm'>
							<input type="text"
								onChange={(e) => {
									setTags(e.target.value)
								}}

								placeholder='Add some tags..' className=' outline-none w-full h-12' />
						</div>




						<div id='editor' className='min-h-[500px] w-full border rounded-md focus:border-black border-gray-500 ' />
						<p className='text-sm text-gray-500'>
							Use{' '}
							<kbd className='rounded-md border bg-muted px-1 text-xs uppercase'>
								Tab
							</kbd>{' '}
							to open the command menu.
						</p>
					</div>

					<div className='flex justify-center gap-x-9'>

						<button disabled={isPending} type='button' onClick={handleSubmit(onUpdate)} className={`text-lg text-white  font-semibold  px-4 py-2 rounded-lg   ${isPending ? 'bg-blue-100' : 'bg-blue-500'} `}>{
							isPending ? 'Publsihing' : 'Publish'

						}</button>

						<button type='button' disabled={isDraftLoading} onClick={handleSubmit(onDraft)} className={`text-lg text-white  font-semibold  px-4 py-2 rounded-lg   ${isPending ? 'bg-gray-100' : 'bg-gray-400'} `}>{
							isDraftLoading ? 'Saving' : 'Save as Draft'

						}</button>
					</div>
				</form>

				<div className='w-1/4 bg-white h-[50vh] rounded-lg p-5'>
					Idk what to add here
				</div>

				<Toaster richColors position='top-center' />
			</div>
		</>
	)
}

export default EditPost