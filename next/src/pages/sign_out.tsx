import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useUserState, useSnackbarState } from '@/hooks/useGlobalState'

const SignOut: NextPage = () => {
  localStorage.clear()
  const router = useRouter()
  const [, setUser] = useUserState()
  const [, setSnackbar] = useSnackbarState()

  useEffect(() => {
    setUser({
      id: 0,
      name: '',
      email: '',
      isSignedIn: false,
      isFetched: true,
    })

    // スナックバーを表示させる
    setSnackbar({
      message: 'サインアウトしました',
      severity: 'success',
      pathname: '/',
    })

    router.push('/')
  }, [router, setUser, setSnackbar])

  return <></>
}

export default SignOut
