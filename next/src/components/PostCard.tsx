import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FavoriteIcon from '@mui/icons-material/Favorite'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined'
import PersonIcon from '@mui/icons-material/Person'
import PlaceIcon from '@mui/icons-material/Place'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'
import axios, { AxiosError } from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import AuthRequiredModal from './AuthRequiredModal'
import { useUserState } from '@/hooks/useGlobalState'
import { PostCardProps } from '@/types/PostCardProps'

const omit = (text: string) => (len: number) => (ellipsis: string) =>
  text.length >= len ? text.slice(0, len - ellipsis.length) + ellipsis : text
const FavoriteFontSize = '1.3rem'

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
    favoritesCount: initialFavoriteCount,
  } = props
  const [currentUser] = useUserState()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isFavorited, setIsFavorited] = useState<boolean>(false)
  const [favoritesCount, setFavoritesCount] =
    useState<number>(initialFavoriteCount)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const open = Boolean(anchorEl)

  // いいねの追加・削除をするapiのurl
  const url =
    process.env.NEXT_PUBLIC_API_BASE_URL + '/posts/' + id + '/favorites'

  // ログインユーザがいいねを押しているかチェックする
  useEffect(() => {
    const hasFavorited = favorites.some(
      (favorite) => favorite.user_id === currentUser.id,
    )
    setIsFavorited(hasFavorited)
  }, [favorites, currentUser])

  // 3点リーダーの表示
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  // 3点リーダーの非表示
  const handleClose = () => {
    setAnchorEl(null)
  }

  // いいねボタンをクリック
  const handleLikeClick = () => {
    // ログインしていない場合モーダルを表示する
    if (!currentUser.isSignedIn) setIsModalOpen(true)
    const headers = {
      'Content-Type': 'multipart/form-data',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }
    if (isFavorited) {
      // いいねを追加する
      axios({
        method: 'DELETE',
        url: url,
        headers: headers,
      })
        .then(() => {
          setIsFavorited(false)
          setFavoritesCount((prev) => prev - 1) //いいね数を減らす
        })
        .catch((err: AxiosError<{ error: string }>) => {
          console.log(err.message)
          console.log(err)
        })
    } else {
      // いいねを削除する
      axios({
        method: 'POST',
        url: url,
        headers: headers,
      })
        .then(() => {
          setIsFavorited(true)
          setFavoritesCount((prev) => prev + 1)
        })
        .catch((err: AxiosError<{ error: string }>) => {
          console.log(err.message)
          console.log(err)
        })
    }
  }

  // モーダルを閉じる。
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
          sx={{
            fontSize: FavoriteFontSize,
            color: isFavorited ? 'red' : 'gray',
          }}
          aria-label="add to favorites"
          onClick={handleLikeClick}
        >
          <FavoriteIcon sx={{ fontSize: FavoriteFontSize }} />
          {favoritesCount}
        </IconButton>
        <Link href={'/posts/' + id}>
          <Button size="small">地図で見る</Button>
        </Link>
      </CardActions>
      <AuthRequiredModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </Card>
  )
}

export default PostCard
