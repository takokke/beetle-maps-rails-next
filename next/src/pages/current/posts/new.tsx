import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  Stack,
  TextField,
  Container,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import axios, { AxiosError } from 'axios'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import PostMaps from '@/components/PostMaps'
import { useSnackbarState } from '@/hooks/useGlobalState'
import { PostFormData } from '@/types/PostFormData'
// React Material File Upload
//見えないinput要素のstyleを定義

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

const CurrentPostsNew: NextPage = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [, setSnackbar] = useSnackbarState()

  const { control, setValue, handleSubmit } = useForm<PostFormData>({
    defaultValues: {
      image: null,
      creatureName: '',
      caption: '',
      latitude: 0,
      longitude: 0,
      address: '',
    },
  })

  // 緯度と経度を更新する関数
  const updateLatLng = (lat: number, lng: number) => {
    setValue('latitude', lat)
    setValue('longitude', lng)
  }
  // 住所を更新する関数
  const updateAddress = (address: string) => {
    setValue('address', address)
  }

  const validationRules = {
    image: {
      required: '画像をアップロードしてください。',
    },
    creatureName: {
      required: '生き物の名前を入力してください。',
    },
    discoverDate: {
      required: '発見日を入力してください。',
    },
    address: {
      required: '場所を入力してください。',
    },
    latitude: {
      required: '緯度を入力してください。',
    },
    longitude: {
      required: '経度を入力してください。',
    },
  }

  // 投稿処理
  const onSubmit: SubmitHandler<PostFormData> = (data) => {
    setIsLoading(true)
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/current/posts'

    const headers = {
      'Content-Type': 'multipart/form-data',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }

    if (data.image === null) return
    console.log(data.image)
    // 投稿データの作成
    const formData = new FormData()
    formData.append('post[image]', data.image[0])
    formData.append('post[discover_date]', data.discoverDate)
    formData.append('post[creature_name]', data.creatureName)
    formData.append('post[caption]', data.caption)
    formData.append('post[address]', data.address)
    formData.append('post[latitude]', String(data.latitude))
    formData.append('post[longitude]', String(data.longitude))

    //APIリクエスト
    axios({
      method: 'POST',
      url: url,
      data: formData,
      headers: headers,
    })
      .then(() => {
        setSnackbar({
          message: '投稿しました',
          severity: 'success',
          pathname: '/',
        })
        setIsLoading(false)
        router.push('/')
      })
      .catch((err: AxiosError<{ error: string }>) => {
        console.log(err.message)
        setIsLoading(false)
        setSnackbar({
          message: '投稿に失敗しました',
          severity: 'error',
          pathname: '/current/posts/new',
        })
      })
  }

  return (
    <Box sx={{ paddingTop: '28px' }}>
      <Container
        maxWidth="lg"
        sx={{
          display: { md: 'flex', sm: 'block' },
          justifyContent: { md: 'center' },
        }}
      >
        <Stack
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          spacing={2}
          sx={{
            width: {
              md: '550px',
              sm: '300px',
            },
            paddingRight: { md: '13px' },
          }}
        >
          <Typography>写真をアップロードしよう</Typography>

          <Controller
            name="image"
            control={control}
            rules={validationRules.image}
            render={({ field: { onChange }, fieldState }) => (
              <>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload files
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files) {
                        onChange(e.target.files)
                      }
                    }}
                    multiple
                  />
                </Button>
                {fieldState.error && (
                  <span style={{ color: 'red' }}>
                    {fieldState.error.message}
                  </span>
                )}
              </>
            )}
          />
          <Controller
            name="discoverDate"
            rules={validationRules.discoverDate}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="date"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                sx={{ backgroundColor: 'white' }}
              />
            )}
          />
          <Controller
            name="creatureName"
            rules={validationRules.creatureName}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="text"
                label="生き物の名前"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                sx={{ backgroundColor: 'white' }}
              />
            )}
          />
          <Controller
            name="caption"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="textarea"
                label="観察メモ"
                placeholder="コメントをここに"
                rows={4}
                multiline
                fullWidth
                sx={{ backgroundColor: 'white' }}
              />
            )}
          />
          <Typography>見つけた場所を地図上でクリックしよう</Typography>
          <Controller
            name="address"
            rules={validationRules.address}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="text"
                label="場所"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                sx={{ backgroundColor: 'white' }}
              />
            )}
          />
          <Stack direction="row" spacing={2}>
            <Controller
              name="latitude"
              rules={validationRules.latitude}
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  type="number"
                  label="緯度"
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                  sx={{ backgroundColor: 'white', flex: 1 }}
                />
              )}
            />
            <Controller
              name="longitude"
              rules={validationRules.longitude}
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  type="number"
                  label="経度"
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                  sx={{ backgroundColor: 'white', flex: 1 }}
                />
              )}
            />
          </Stack>
          <LoadingButton
            variant="contained"
            type="submit"
            loading={isLoading}
            sx={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: { xs: 12, sm: 16 },
            }}
          >
            投稿する
          </LoadingButton>
        </Stack>
        <Box sx={{ paddingTop: { md: '90px' } }}>
          <PostMaps updateLatLng={updateLatLng} updateAddress={updateAddress} />
        </Box>
      </Container>
    </Box>
  )
}

export default CurrentPostsNew
