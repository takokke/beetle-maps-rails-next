import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material'
import camelcaseKeys from 'camelcase-keys'
import { NextPage } from 'next'
import Image from 'next/image'
import { useState } from 'react'
import useSWR from 'swr'
import Error from '@/components/Error'
import ViewMap from '@/components/ViewMap'
import { PostType } from '@/types/Post'
import { fetcher } from '@/utils'

type MapBounds = {
  top_right_latitude: number
  top_right_longitude: number
  bottom_left_latitude: number
  bottom_left_longitude: number
}

const Map: NextPage = () => {
  const [open, setOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null)
  const [mapBounds, setMapBounds] = useState<MapBounds | null>(null)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  const handleMarkerClick = (post: PostType) => {
    setSelectedPost(post)
    setOpen(true)
  }

  //bounds更新ハンドラー
  const handleBoundsChanged = (bounds: MapBounds) => {
    setMapBounds(bounds)
  }

  const url = mapBounds
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/map?top_right_latitude=${mapBounds.top_right_latitude}&top_right_longitude=${mapBounds.top_right_longitude}&bottom_left_latitude=${mapBounds.bottom_left_latitude}&bottom_left_longitude=${mapBounds.bottom_left_longitude}`
    : null

  const { data, error } = useSWR(url, fetcher)

  if (error) return <Error />

  const posts: PostType[] = data ? camelcaseKeys(data) : []

  const DrawerList = (
    <Box sx={{ width: 400 }} role="presentation" onClick={toggleDrawer(true)}>
      {selectedPost ? (
        <>
          <List>
            <ListItem>
              <ListItemText
                primary={selectedPost.creatureName}
                secondary={selectedPost.address}
              />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem key="1">
              <Image
                layout="responsive"
                width={250}
                height={200} // アスペクト比に基づいた高さを指定
                src={selectedPost.imageUrl}
                blurDataURL={selectedPost.imageUrl}
                alt="生き物の画像"
                objectFit="cover"
                placeholder="blur"
              />
            </ListItem>
            <ListItem key="2">
              <ListItemText primary={selectedPost.caption} />
            </ListItem>
          </List>
        </>
      ) : (
        <List>
          <ListItem>
            <ListItemText primary="No post selected" />
          </ListItem>
        </List>
      )}
    </Box>
  )

  return (
    <Box>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <ViewMap
        posts={posts}
        onMarkerClick={handleMarkerClick}
        onBoundsChanged={handleBoundsChanged}
      />
    </Box>
  )
}

export default Map
