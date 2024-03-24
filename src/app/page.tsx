import Categories from '@/components/Categories';
import ReadPost from '@/components/ReadPost';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';


export default async function Home() {
const session = await getServerSession(authOptions)


  return (
    <>
      <div className='px-5 pt-3 flex flex-col min-h-screen h-full bg-[#0C1615] items-center '>

        {/* <h1 className='text-4xl font-semibold'>Your feed</h1> */}

        <div className='   '>
          <Categories session = {session}  />
          <ReadPost className=''  session = {session}/>
          {/* <CreatePostCard className='w-2/5'/> */}
        </div>
      </div>

    </>
  )
}
