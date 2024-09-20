import ArrowBackIosSharpIcon from '@mui/icons-material/ArrowBackIosSharp'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import CommentIcon from '@mui/icons-material/Comment'
import PersonIcon from '@mui/icons-material/Person'
import PlaceIcon from '@mui/icons-material/Place'
import {
  Box,
  Stack,
  Container,
  Avatar,
  Typography,
  IconButton,
} from '@mui/material'
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
      <Container maxWidth="lg" sx={{ pt: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: 18,
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            {post.creatureName}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Typography
            sx={{
              fontSize: 14,
            }}
          >
            <IconButton sx={{ p: 0, mr: 2 }}>
              <Avatar>
                <PlaceIcon />
              </Avatar>
            </IconButton>
            {post.address}
          </Typography>
        </Box>

        <Carousel
          NextIcon={<ArrowForwardIosSharpIcon />}
          PrevIcon={<ArrowBackIosSharpIcon />}
          swipe={false}
          autoPlay={false}
          navButtonsAlwaysVisible={true}
          navButtonsWrapperProps={{
            //矢印ボタン周りの設定
            style: {
              position: 'absolute',
              top: '50%', // 上から50%の位置
              transform: 'translateY(-50%)', // 縦中央に調整
              height: '60px',
            },
          }}
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

        <Box
          sx={{
            mt: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{ width: '100%', maxWidth: '400px' }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{ mb: 2 }}
            >
              <CalendarMonthIcon />
              <Typography variant="body2" color="textSecondary">
                {new Date(post.discoverDate).toLocaleDateString('ja-JP')}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{ mb: 2 }}
            >
              <PersonIcon />
              <Typography variant="body2" color="textSecondary">
                投稿者: {post.user.name}
              </Typography>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={2}>
              <CommentIcon />
              <Typography variant="body2" color="textSecondary">
                {post.caption}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default PostDetail
