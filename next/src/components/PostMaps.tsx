import { Box } from '@mui/material'
// import GoogleMapReact from 'google-map-react'
import { GoogleMap } from '@react-google-maps/api'
import { useState } from 'react'

const containerStyle = {
  width: '600px',
  height: '600px',
}

type LatLng = {
  lat: number
  lng: number
}
// const language = 'ja' // ここで言語を決定

const PostMaps = () => {
  const [centertLatLng, setCenterLatLng] = useState<LatLng>({
    lat: 35.7022589,
    lng: 139.7744733,
  })

  const clickSetLatLng = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat()
      const lng = event.latLng.lng()
      console.log(lat)
      console.log(lng)
      setCenterLatLng({ lat, lng })
    }
  }

  return (
    <Box>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={centertLatLng}
        zoom={10}
        onClick={clickSetLatLng}
      ></GoogleMap>
    </Box>
  )
}

export default PostMaps
