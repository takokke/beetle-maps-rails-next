import FavoriteIcon from '@mui/icons-material/Favorite'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined'
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
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'
import { useUserState } from '@/hooks/useGlobalState'

type PostCardProps = {
  id: number
  imageUrl: string
  creatureName: string
  address: string
  onDelete: (id: number) => void
  user: {
    id: number
    name: string
  }
}

const omit = (text: string) => (len: number) => (ellipsis: string) =>
  text.length >= len ? text.slice(0, len - ellipsis.length) + ellipsis : text

const PostCard = (props: PostCardProps) => {
  const { id, imageUrl, creatureName, user, address, onDelete } = props
  const [currentUser] = useUserState()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  //globalステートメントのユーザーのidとpost.user.idが一致
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
        <CardHeader
          sx={{ padding: '7px 15px 7px 4px' }}
          avatar={
            <Avatar>
              <PersonIcon />
            </Avatar>
          }
          action={
            currentUser.isSignedIn &&
            currentUser.id === user.id && (
              <>
                <IconButton onClick={handleClick} aria-label="settings">
                  <MoreHorizOutlinedIcon />
                </IconButton>
                <Menu
                  open={open}
                  anchorEl={anchorEl}
                  id="account-menu"
                  onClose={handleClose}
                  onClick={handleClose}
                >
                  <MenuItem sx={{ color: '#0000008a' }}>
                    <EditIcon fontSize="small" />
                    編集
                  </MenuItem>
                  <MenuItem onClick={() => onDelete(id)} sx={{ color: 'red' }}>
                    <DeleteIcon fontSize="small" />
                    削除
                  </MenuItem>
                </Menu>
              </>
            )
          }
        />
        <Box sx={{ position: 'relative', width: '100%', height: 200 }}>
          <Image
            layout="fill"
            src={imageUrl}
            blurDataURL={imageUrl}
            alt="生き物の画像"
            objectFit="cover"
            placeholder="blur"
          />
        </Box>
        <Typography
          component="h3"
          sx={{
            minHeight: 20,
            fontSize: 16,
            fontWeight: 'bold',
            lineHeight: 1.5,
          }}
        >
          {omit(creatureName)(45)('...')}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: 12 }}>{address}</Typography>
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
