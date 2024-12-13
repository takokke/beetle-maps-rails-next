import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FavoriteIcon from '@mui/icons-material/Favorite'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined'
import PersonIcon from '@mui/icons-material/Person'
import PlaceIcon from '@mui/icons-material/Place'
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import AuthRequiredModal from './AuthRequiredModal'
import { useUserState } from '@/hooks/useGlobalState'
import { PostCardProps } from '@/types/PostCardProps'

const omit = (text: string) => (len: number) => (ellipsis: string) =>
  text.length >= len ? text.slice(0, len - ellipsis.length) + ellipsis : text

const PostCard = (props: PostCardProps) => {
  const {
    id,
    imageUrl,
    creatureName,
    user,
    address,
    discoverDate,
    onDelete,
    favorites,
    favoritesCount,
  } = props
  const [currentUser] = useUserState()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isFavorited, setIsFavorited] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const open = Boolean(anchorEl)
  console.log(isFavorited)

  // ログインユーザがいいねを押しているかチェックする
  useEffect(() => {
    const hasFavorited = favorites.some(
      (favorite) => favorite.user_id === currentUser.id,
    )
    setIsFavorited(hasFavorited)
  }, [favorites, currentUser])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  // いいねボタンをクリック
  const handleLikeClick = () => {
    setIsModalOpen(true)
  }
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <Card>
      <CardHeader
        sx={{ padding: '7px 15px 7px 4px' }}
        avatar={
          <Avatar>
            <PlaceIcon />
          </Avatar>
        }
        title={address}
        subheader={new Date(discoverDate).toLocaleDateString('ja-JP')}
        action={
          //globalステートメントのユーザーのidとpost.user.idが一致
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
      <Link href={'/posts/' + id}>
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
        <CardContent sx={{ padding: '5px 0 0 8px' }}>
          <Typography
            component="h3"
            sx={{
              minHeight: 20,
              fontSize: 18,
              fontWeight: 'bold',
              lineHeight: 1.5,
              paddingLeft: 1,
            }}
          >
            {omit(creatureName)(45)('...')}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontSize: 12 }}>
              <PersonIcon />
              {user.name}
            </Typography>
          </Box>
        </CardContent>
      </Link>
      <CardActions
        disableSpacing
        style={{ justifyContent: 'space-between', paddingTop: '0' }}
      >
        <IconButton
          sx={{ color: isFavorited ? 'red' : 'gray' }}
          aria-label="add to favorites"
          onClick={handleLikeClick}
        >
          <FavoriteIcon />
          {favoritesCount}
        </IconButton>
      </CardActions>
      <AuthRequiredModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </Card>
  )
}

export default PostCard
