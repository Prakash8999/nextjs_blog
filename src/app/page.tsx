

import Categories from '@/components/Categories';
import CreatePostCard from '@/components/CreatePostCard';
import ReadPost from '@/components/ReadPost';


export default function Home() {


  return (
    <>
      <div className='px-5 pt-5 min-h-screen h-full bg-gray-100'>

        {/* <h1 className='text-4xl font-semibold'>Your feed</h1> */}

        <div className=' flex gap-x-5  '>
          <Categories  />
          <ReadPost className='w-3/5' />
          {/* <CreatePostCard className='w-2/5'/> */}
        </div>
      </div>

    </>
  )
}
