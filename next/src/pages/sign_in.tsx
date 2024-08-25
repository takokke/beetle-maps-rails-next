import { LoadingButton } from '@mui/lab'
import { Box, Container, TextField, Typography, Stack } from '@mui/material'
import axios, { AxiosResponse, AxiosError } from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useSnackbarState, useUserState } from '@/hooks/useGlobalState'
import { SignInFormData } from '@/types/SignInFormData'

const SignIn: NextPage = () => {
  const router = useRouter()
  const [user, setUser] = useUserState()
  const [, setSnackbar] = useSnackbarState()

  const { handleSubmit, control } = useForm<SignInFormData>({
    defaultValues: { email: '', password: '' },
  })
  const [isLoading, setIsLoading] = useState(false)

  const validationRules = {
    email: {
      required: 'メールアドレスを入力してください。',
      pattern: {
        value:
          /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
        message: '正しい形式のメールアドレスを入力してください。',
      },
    },
    password: {
      required: 'パスワードを入力してください。',
    },
  }
  const onSubmit: SubmitHandler<SignInFormData> = (data) => {
    setIsLoading(true)
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/auth/sign_in'
    const headers = { 'Content-Type': 'application/json' }

    axios({
      method: 'POST',
      url: url,
      data: data,
      headers: headers,
    })
      .then((res: AxiosResponse) => {
        localStorage.setItem('access-token', res.headers['access-token'])
        localStorage.setItem('client', res.headers['client'])
        localStorage.setItem('uid', res.headers['uid'])

        // データフェッチの状態を完了にする
        setUser({
          ...user,
          isFetched: false,
        })

        // スナックバーを表示させる
        setSnackbar({
          message: 'サインインに成功しました',
          severity: 'success',
          pathname: '/',
        })

        router.push('/')
      })
      .catch((e: AxiosError<{ error: string }>) => {
        console.log(e.message)
        setIsLoading(false)

        // スナックバーを表示させる
        setSnackbar({
          message: '登録ユーザーが見つかりません',
          severity: 'error',
          pathname: '/sign_in',
        })
      })
  }

  return (
    <Box
      sx={{
        backgroundColor: '#EDF2F7',
        minHeight: 'calc(100vh - 57px)',
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ mb: 4, pt: 4 }}>
          <Typography
            component="h2"
            sx={{ fontSize: 32, color: 'black', fontWeight: 'bold' }}
          >
            Sign in
          </Typography>
        </Box>
        <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
          <Controller
            name="email"
            control={control}
            rules={validationRules.email}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="text"
                label="メールアドレス"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                sx={{ backgroundColor: 'white' }}
              />
            )}
          />
          <Controller
            name="password"
            rules={validationRules.password}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="password"
                label="パスワード"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                sx={{ backgroundColor: 'white' }}
              />
            )}
          />
          <LoadingButton
            variant="contained"
            type="submit"
            loading={isLoading}
            sx={{ fontWeight: 'bold', color: 'white' }}
          >
            送信する
          </LoadingButton>
        </Stack>
      </Container>
    </Box>
  )
}

export default SignIn
