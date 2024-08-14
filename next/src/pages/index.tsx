import type { NextPage } from 'next'
import useSWR from 'swr'
import { fetcher } from '@/utils'

const Index: NextPage = () => {
  const url = 'http://localhost:3000/api/v1/health_check'
  const { data, error } = useSWR(url, fetcher)

  if (error) return <div className='text-orange-300'>An error has occurred.</div>
  if (!data) return <>Loading...</>

  return (
    <>
      <div className='text-orange-300'>Rails疎通確認</div>
      <div>レスポンスメッセージ: {data.message}</div>
    </>
  )
}

export default Index