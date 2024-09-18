import { Box } from '@mui/material'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { PostType } from '@/types/Post'

type PostDetailMapProps = {
  post: PostType
}

const containerStyle = {
  width: '100%',
  height: '60vh',
}

const PostDetailMap = (props: PostDetailMapProps) => {
  const { post } = props

  const centerLocation = {
    lat: post.latitude,
    lng: post.longitude,
  }

  return (
    <Box>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={centerLocation}
        zoom={10}
      >
        {post && (
          <Marker
            key={post.id}
            position={{ lat: post.latitude, lng: post.longitude }}
          />
        )}
      </GoogleMap>
    </Box>
  )
}
export default PostDetailMap
