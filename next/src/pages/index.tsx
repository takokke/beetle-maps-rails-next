import { Box, Container, Grid } from '@mui/material'
import camelcaseKeys from 'camelcase-keys'
import type { NextPage } from 'next'
import useSWR from 'swr'
import Error from '@/components/Error'
import Loading from '@/components/Loading'
import PostCard from '@/components/PostCard'
import { styles } from '@/styles'
import { PostType } from '@/types/Post'
import { fetcher } from '@/utils'

const Index: NextPage = () => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/posts'
  const { data, error } = useSWR(url, fetcher)

  if (error) return <Error />
  if (!data) return <Loading />

  const posts = camelcaseKeys(data)

  return (
    <>
      <Box css={styles.pageMinHeight} sx={{ backgroundColor: '#e6f2ff' }}>
        <Container maxWidth="md" sx={{ pt: 6 }}>
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
        </Container>
      </Box>
    </>
  )
}

export default Index
