import { Box } from '@mui/material'
import { GoogleMap, Marker } from '@react-google-maps/api'
import camelcaseKeys from 'camelcase-keys'
import { useState, useCallback } from 'react'
import useSWR from 'swr'
import Error from './Error'
import { useCurrentLocation } from '@/hooks/useGlobalState'
import { PostType } from '@/types/Post'
import { fetcher } from '@/utils'

type MapInstance = google.maps.Map

// 地図の境界線をまとめる型
type MapBounds = {
  top_right_latitude: number
  top_right_longitude: number
  bottom_left_latitude: number
  bottom_left_longitude: number
}

const containerStyle = {
  width: '100%',
  height: 'calc(100vh - 64px)',
}

const ViewMap = () => {
  // 現在地を取得
  const [currentLocation] = useCurrentLocation()

  const [mapBounds, setMapBounds] = useState<MapBounds | null>(null)
  const [mapInstance, setMapInstance] = useState<MapInstance | null>(null)

  const handleBoundsChanged = useCallback(() => {
    if (mapInstance) {
      const bounds = mapInstance.getBounds()
      if (bounds) {
        const ne = bounds.getNorthEast()
        const sw = bounds.getSouthWest()
        setMapBounds({
          top_right_latitude: ne.lat(),
          top_right_longitude: ne.lng(),
          bottom_left_latitude: sw.lat(),
          bottom_left_longitude: sw.lng(),
        })
      }
    }
  }, [mapInstance])

  const url = process.env.NEXT_PUBLIC_API_BASE_URL

  const { data, error } = useSWR(
    mapBounds !== null
      ? url +
          `/map?top_right_latitude=${mapBounds.top_right_latitude}
          &top_right_longitude=${mapBounds.top_right_longitude}
          &bottom_left_latitude=${mapBounds.bottom_left_latitude}
          &bottom_left_longitude=${mapBounds.bottom_left_longitude}`
      : null,
    fetcher,
  )
  console.log(data)
  const posts: PostType[] = data ? camelcaseKeys(data, { deep: true }) : null

  if (error) return <Error />

  return (
    <Box>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation}
        zoom={10}
        onLoad={(map) => setMapInstance(map)}
        onIdle={handleBoundsChanged}
      >
        {posts &&
          posts.map((post) => (
            <Marker
              key={post.id}
              position={{ lat: post.latitude, lng: post.longitude }}
            />
          ))}
      </GoogleMap>
    </Box>
  )
}
export default ViewMap
