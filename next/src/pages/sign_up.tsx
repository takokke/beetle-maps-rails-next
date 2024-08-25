import { LoadingButton } from '@mui/lab'
import { Box, Container, TextField, Typography, Stack } from '@mui/material'
import axios, { AxiosResponse, AxiosError } from 'axios'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useSnackbarState, useUserState } from '@/hooks/useGlobalState'
import { styles } from '@/styles'
import { SignUpFormData } from '@/types/SignUpFormData'

const SignUp: NextPage = () => {
  const router = useRouter()
  const [user, setUser] = useUserState()

  const [isLoading, setIsLoading] = useState(false)
  const [, setSnackbar] = useSnackbarState()
  const { handleSubmit, control } = useForm<SignUpFormData>({
    defaultValues: { email: '', password: '' },
  })

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
    name: {
      required: '名前を入力してください。',
    },
  }
  const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
    setIsLoading(true)
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/auth'
    const headers = { 'Content-Type': 'application/json' }
    axios({
      method: 'POST',
      url: url,
      data: data,
      headers: headers,
    })
      .then((res: AxiosResponse) => {
        localStorage.setItem('access-token', res.headers['access-token'] || '')
        localStorage.setItem('client', res.headers['client'] || '')
        localStorage.setItem('uid', res.headers['uid'] || '')

        setSnackbar({
          message: 'ユーザー登録に成功しました',
          severity: 'success',
          pathname: '/',
        })
        setIsLoading(false)
        setUser({
          ...user,
          isFetched: false,
        })
        router.push('/')
      })
      .catch((e: AxiosError<{ error: string }>) => {
        console.error(e.message)
        setSnackbar({
          message: '不正なユーザー情報です',
          severity: 'error',
          pathname: '/sign_up',
        })
        setIsLoading(false)
      })
  }

  return (
    <Box
      css={styles.pageMinHeight}
      sx={{
        backgroundColor: '#EDF2F7',
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ mb: 4, pt: 4 }}>
          <Typography
            component="h2"
            sx={{ fontSize: 32, color: 'black', fontWeight: 'bold' }}
          >
            Sign Up
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
            control={control}
            rules={validationRules.password}
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
          <Controller
            name="name"
            control={control}
            rules={validationRules.name}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="text"
                label="ユーザー名"
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

export default SignUp
