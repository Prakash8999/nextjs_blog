'use client'

import EditorJS from '@editorjs/editorjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter } from 'next/navigation'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'
import { z } from 'zod'

import { uploadFiles } from '../../helpers/uploadthing'



import { useMutation } from '@tanstack/react-query'
import axios from 'axios'


import { Toaster, toast } from 'sonner'
import { PostValidator, PostCreationRequest } from '../../validators/post'
import UsersPost from './user/UsersPost'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../lib/auth'

type FormData = z.infer<typeof PostValidator>

export const Create = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(PostValidator),
    defaultValues: {

      title: '',
      content: null,
      publish: true,
      draft: false

    },
  })
  const ref = useRef<EditorJS>()
  const _titleRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const pathname = usePathname()
  const [isDraftLoading, setIsDraftLoading] = useState(false)
  const { mutate: createPost, isPending } = useMutation({
    mutationFn: async ({
      title,
      content,
      publish,
      draft

    }: PostCreationRequest) => {
      const payload: PostCreationRequest = { title, content, publish, draft }
      const { data } = await axios.post('/api/post/submit', payload)
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
      draft

    }: PostCreationRequest) => {
      setIsDraftLoading(true)
      const payload: PostCreationRequest = { title, content, publish, draft }
      const { data } = await axios.post('/api/post/submit', payload)
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



  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default
    const Header = (await import('@editorjs/header')).default
    const Embed = (await import('@editorjs/embed')).default
    const Table = (await import('@editorjs/table')).default
    const List = (await import('@editorjs/list')).default
    const Code = (await import('@editorjs/code')).default
    const LinkTool = (await import('@editorjs/link')).default
    const InlineCode = (await import('@editorjs/inline-code')).default
    const ImageTool = (await import('@editorjs/image')).default

    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          ref.current = editor
        },
        placeholder: 'Type here to write your post...',
        inlineToolbar: true,
        data: { blocks: [] },
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
      await initializeEditor()

      setTimeout(() => {
        _titleRef?.current?.focus()
      }, 2000)
    }

    if (isMounted) {
      init()

      return () => {
        ref.current?.destroy()
        ref.current = undefined
      }
    }
  }, [isMounted, initializeEditor])

  async function onSubmit(data: FormData) {
    const blocks = await ref.current?.save()

    const payload: PostCreationRequest = {
      title: data.title,
      content: blocks,
      publish: true,
      draft: false
    }

    createPost(payload)
  }
  async function onDraft(data: FormData) {
    const blocks = await ref.current?.save()

    const payload: PostCreationRequest = {
      title: data.title,
      content: blocks,
      publish: false,
      draft: true
    }

    createDraft(payload)
  }

  if (!isMounted) {
    return null
  }

  const { ref: titleRef, ...rest } = register('title')




  return (
    <div className='w-full flex justify-center gap-x-5 p-4 bg-zinc-100	rounded-lg border border-zinc-200'>
      <form
        id='subreddit-post-form '
        className='md:w-3/5 w-[95vw]  rounded-md p-4  bg-white text-black shadow-md'
      // onSubmit={handleSubmit(onSubmit)}
      >
        <div className='prose prose-stone dark:prose-invert'>
          <div className='flex  gap-x-3 pb-4'>
          <p>
            Cover Photo
          </p>
          <input type="file" accept="image/png, image/jpeg" />

          </div>


          <TextareaAutosize
            ref={(e) => {
              titleRef(e)
              // @ts-ignore
              _titleRef.current = e
            }}
            {...rest}
            placeholder='Title'
            className='w-full h-12 resize-none py-2 pl-1 appearance-none overflow-hidden bg-transparent text-xl font-bold border outline-none outline focus:border-black placeholder:font-normal rounded-md'
          />
          <div id='editor' className='min-h-[500px] w-full border  focus:border-black border-gray-500 ' />
          <p className='text-sm text-gray-500'>
            Use{' '}
            <kbd className='rounded-md border bg-muted px-1 text-xs uppercase'>
              Tab
            </kbd>{' '}
            to open the command menu.
          </p>
        </div>

        <div className='flex justify-center gap-x-9'>

          <button disabled={isPending} type='button' onClick={handleSubmit(onSubmit)} className={`text-lg text-white  font-semibold  px-4 py-2 rounded-lg   ${isPending ? 'bg-blue-100' : 'bg-blue-500'} `}>{
            isPending ? 'Publsihing' : 'Publish'

          }</button>

          <button type='button' disabled={isDraftLoading} onClick={handleSubmit(onDraft)} className={`text-lg text-white  font-semibold  px-4 py-2 rounded-lg   ${isPending ? 'bg-gray-100' : 'bg-gray-400'} `}>{
            isDraftLoading ? 'Saving' : 'Save as Draft'

          }</button>
        </div>
      </form>

      <div className='w-1/4 bg-white h-[50vh] rounded-lg p-5'>
        {/* <h1 className='text-center text-xl pb-2'>Your recent posts</h1>
        <UsersPost /> */}

        //Idk what to add here
      </div>

      <Toaster richColors position='top-center' />
    </div>
  )
}
