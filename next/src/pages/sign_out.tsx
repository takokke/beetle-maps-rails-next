import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useUserState } from '@/hooks/useGlobalState'

const SignOut: NextPage = () => {
  localStorage.clear()
  const router = useRouter()
  const [, setUser] = useUserState()
  useEffect(() => {
    setUser({
      id: 0,
      name: '',
      email: '',
      isSignedIn: false,
      isFetched: true,
    })
    router.push('/')
  }, [router, setUser])
  return <></>
}

export default SignOut
