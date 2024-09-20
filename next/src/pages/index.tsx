import { Box, Container, Grid, Pagination } from '@mui/material'
import axios, { AxiosError } from 'axios'
import camelcaseKeys from 'camelcase-keys'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import useSWR from 'swr'
import Error from '@/components/Error'
import Loading from '@/components/Loading'
import PostCard from '@/components/PostCard'
import { useSnackbarState } from '@/hooks/useGlobalState'
import { styles } from '@/styles'
import { PostType } from '@/types/Post'
import { fetcher } from '@/utils'

const Index: NextPage = () => {
  const router = useRouter()
  const [posts, setPosts] = useState<PostType[]>([])
  const [, setSnackbar] = useSnackbarState()

  const page = 'page' in router.query ? Number(router.query.page) : 1
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/posts/?page=' + page
  const { data, error } = useSWR(url, fetcher)

  useEffect(() => {
    if (data) {
      setPosts(camelcaseKeys(data.posts))
    }
  }, [data])

  if (error) return <Error />
  if (!data) return <Loading />

  const meta = camelcaseKeys(data.meta)

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.push('/?page=' + value)
  }

  const handleDeleteClick = (id: number) => {
    if (!window.confirm('本当に削除しますか？')) {
      return
    }

    const headers = {
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }

    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/current/posts/' + id

    axios({
      method: 'DELETE',
      url: url,
      headers: headers,
    })
      .then(() => {
        setPosts(posts.filter((post) => post.id === id))
        setSnackbar({
          message: '投稿の削除に成功しました',
          severity: 'success',
          pathname: '/',
        })
      })
      .catch((err: AxiosError<{ error: string }>) => {
        console.log(err.message)
        setSnackbar({
          message: '投稿の削除に失敗しました',
          severity: 'error',
          pathname: '/',
        })
      })
  }

  return (
    <Box css={styles.pageMinHeight} sx={{ backgroundColor: '#e6f2ff' }}>
      <Container maxWidth="lg" sx={{ pt: 6 }}>
        <Grid container spacing={4}>
          {posts.map((post: PostType, i: number) => (
            <Grid key={i} item xs={12} md={4}>
              <PostCard
                id={post.id}
                imageUrl={post.imageUrl}
                creatureName={post.creatureName}
                user={post.user}
                address={post.address}
                discoverDate={post.discoverDate}
                onDelete={handleDeleteClick}
              ></PostCard>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <Pagination
            count={meta.totalPages}
            page={meta.currentPage}
            onChange={handleChange}
          />
        </Box>
      </Container>
    </Box>
  )
}

export default Index
