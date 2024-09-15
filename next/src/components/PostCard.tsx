import FavoriteIcon from '@mui/icons-material/Favorite'
import PersonIcon from '@mui/icons-material/Person'
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from '@mui/material'
import Image from 'next/image'

type PostCardProps = {
  imageUrl: string
  creatureName: string
  userName: string
}

const omit = (text: string) => (len: number) => (ellipsis: string) =>
  text.length >= len ? text.slice(0, len - ellipsis.length) + ellipsis : text

const PostCard = (props: PostCardProps) => {
  return (
    <Card>
      <CardHeader
        sx={{ paddingX: '8px', paddingY: '8px' }}
        avatar={
          <Avatar>
            <PersonIcon />
          </Avatar>
        }
      />
      <Box sx={{ position: 'relative', width: '100%', height: 200 }}>
        <Image
          layout="fill"
          src={props.imageUrl}
          blurDataURL={props.imageUrl}
          alt="生き物の画像"
          objectFit="cover"
          placeholder="blur"
        />
      </Box>
      <CardContent sx={{ padding: '0' }}>
        <Typography
          component="h3"
          sx={{
            minHeight: 20,
            fontSize: 16,
            fontWeight: 'bold',
            lineHeight: 1.5,
          }}
        >
          {omit(props.creatureName)(45)('...')}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: 12 }}>{props.userName}</Typography>
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default PostCard
