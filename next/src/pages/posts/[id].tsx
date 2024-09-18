import ArrowBackIosSharpIcon from '@mui/icons-material/ArrowBackIosSharp'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import { Box, Container } from '@mui/material'
import camelcaseKeys from 'camelcase-keys'
import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Carousel from 'react-material-ui-carousel'
import useSWR from 'swr'
import Error from '@/components/Error'
import Loading from '@/components/Loading'
import PostDetailMap from '@/components/PostDetailMap'
import { styles } from '@/styles'
import { PostType } from '@/types/Post'
import { fetcher } from '@/utils'

const PostDetail: NextPage = () => {
  const router = useRouter()
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/posts/'
  const { id } = router.query

  const { data, error } = useSWR(id ? url + id : null, fetcher)
  if (error) return <Error />
  if (!data) return <Loading />

  const post: PostType = camelcaseKeys(data)

  return (
    <Box css={styles.pageMinHeight} sx={{ backgroundColor: '#e6f2ff' }}>
      <Container maxWidth="lg" sx={{ pt: 6 }}>
        <Carousel
          NextIcon={<ArrowForwardIosSharpIcon />}
          PrevIcon={<ArrowBackIosSharpIcon />}
          swipe={false}
          autoPlay={false}
          navButtonsAlwaysVisible={true}
        >
          <Box sx={{ height: 450 }}>
            <PostDetailMap post={post} />
          </Box>
          {post.imageUrl && (
            <Box sx={{ height: 450 }}>
              <Image
                src={post.imageUrl}
                alt={post.creatureName || 'Post Image'}
                layout="fill"
                objectFit="cover"
              />
            </Box>
          )}
        </Carousel>
      </Container>
    </Box>
  )
}

export default PostDetail
