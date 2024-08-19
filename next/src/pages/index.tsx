import type { NextPage } from 'next'
import useSWR from 'swr'
import { fetcher } from '@/utils'
import camelcaseKeys from 'camelcase-keys'
import { PostType } from '@/types/Post'
import Image from 'next/image'

const Index: NextPage = () => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/posts'
  const { data, error } = useSWR(url, fetcher)

  if (error) return <div className='text-orange-300'>An error has occurred.</div>
  if (!data) return <>Loading...</>

  const posts = camelcaseKeys(data)

  return (
    <>
      <div className='text-orange-300'>Rails疎通確認</div>
      <div>
        {posts.map((post: PostType, i: number) => (
         <div key={i}>
          <p>{post.creatureName}</p>
          <p>{post.imageUrl}</p>
          <Image
            src={post.imageUrl}
            width={200}
            height={200}
            alt="生き物の画像"
          />
         </div>
        ))}
      </div>
    </>
  )
}

export default Index