import Categories from '@/components/Categories';
import ReadPost from '@/components/ReadPost';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';


export default async function Home() {
const session = await getServerSession(authOptions)


  return (
    <>
      <div className='px-5 pt-5 min-h-screen h-full bg-gray-100'>

        {/* <h1 className='text-4xl font-semibold'>Your feed</h1> */}

        <div className=' flex gap-x-5  '>
          <Categories session = {session}  />
          <ReadPost className='w-3/5'  session = {session}/>
          {/* <CreatePostCard className='w-2/5'/> */}
        </div>
      </div>

    </>
  )
}
