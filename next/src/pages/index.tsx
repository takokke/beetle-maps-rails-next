import { Box, Container, Grid, Pagination } from '@mui/material'
import camelcaseKeys from 'camelcase-keys'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Error from '@/components/Error'
import Loading from '@/components/Loading'
import PostCard from '@/components/PostCard'
import { styles } from '@/styles'
import { PostType } from '@/types/Post'
import { fetcher } from '@/utils'

const Index: NextPage = () => {
  const router = useRouter()
  const page = 'page' in router.query ? Number(router.query.page) : 1
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/posts/?page=' + page
  const { data, error } = useSWR(url, fetcher)

  if (error) return <Error />
  if (!data) return <Loading />

  const posts = camelcaseKeys(data.posts)
  const meta = camelcaseKeys(data.meta)

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.push('/?page=' + value)
  }

  return (
    <>
      <Box css={styles.pageMinHeight} sx={{ backgroundColor: '#e6f2ff' }}>
        <Container maxWidth="lg" sx={{ pt: 6 }}>
          <Grid container spacing={4}>
            {posts.map((post: PostType, i: number) => (
              <Grid key={i} item xs={12} md={4}>
                <PostCard
                  imageUrl={post.imageUrl}
                  creatureName={post.creatureName}
                  userName={post.user.name}
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
    </>
  )
}

export default Index
