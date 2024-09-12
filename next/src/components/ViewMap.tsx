import { Box } from '@mui/material'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { useState, useCallback } from 'react'
import { useCurrentLocation } from '@/hooks/useGlobalState'
import { PostType } from '@/types/Post'

type MapInstance = google.maps.Map

// 地図の境界線をまとめる型
type MapBounds = {
  top_right_latitude: number
  top_right_longitude: number
  bottom_left_latitude: number
  bottom_left_longitude: number
}

type ViewMapProps = {
  posts: PostType[]
  onMarkerClick: (post: PostType) => void
  onBoundsChanged: (bounds: MapBounds) => void
}

const containerStyle = {
  width: '100%',
  height: 'calc(100vh - 64px)',
}

const ViewMap = (props: ViewMapProps) => {
  const { posts, onMarkerClick, onBoundsChanged } = props

  // 現在地を取得
  const [currentLocation] = useCurrentLocation()

  const [mapInstance, setMapInstance] = useState<MapInstance | null>(null)

  const handleBoundsChanged = useCallback(() => {
    if (mapInstance) {
      const bounds = mapInstance.getBounds()
      if (bounds) {
        const ne = bounds.getNorthEast()
        const sw = bounds.getSouthWest()

        const newBounds: MapBounds = {
          top_right_latitude: ne.lat(),
          top_right_longitude: ne.lng(),
          bottom_left_latitude: sw.lat(),
          bottom_left_longitude: sw.lng(),
        }

        onBoundsChanged(newBounds)
      }
    }
  }, [mapInstance, onBoundsChanged])

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
              onClick={() => onMarkerClick(post)}
            />
          ))}
      </GoogleMap>
    </Box>
  )
}
export default ViewMap
