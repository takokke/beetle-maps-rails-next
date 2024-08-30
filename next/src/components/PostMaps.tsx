import { Box } from '@mui/material'
import { GoogleMap } from '@react-google-maps/api'
import { useState, useEffect, useRef } from 'react'

const containerStyle = {
  width: '100%',
  height: '70vh',
}

type LatLng = {
  lat: number
  lng: number
}
type PostMapsProps = {
  updateLatLng: (lat: number, lng: number) => void
  updateAddress: (address: string) => void
}

const PostMaps = (props: PostMapsProps) => {
  const { updateLatLng, updateAddress } = props

  const geocoder = useRef<google.maps.Geocoder | null>(null)

  const [centerLatLng, setCenterLatLng] = useState<LatLng>({
    lat: 35.7022589,
    lng: 139.7744733,
  })

  // geocoderのインスタンスが繰り返し生成されるのを防ぐ
  useEffect(() => {
    geocoder.current = new google.maps.Geocoder()
  }, [])

  // navigatorAPIを用いて、現在地の位置情報を取得
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        // 現在地の緯度・経度をsetする
        setCenterLatLng({ lat: latitude, lng: longitude })
      },
      (error) => {
        console.error('Error fetching current location:', error)
        setCenterLatLng({ lat: 35.7022589, lng: 139.7744733 })
      },
    )
  }, [])

  //マップをクリックした時の処理
  const clickSetLatLng = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat()
      const lng = event.latLng.lng()
      setCenterLatLng({ lat, lng })
      updateLatLng(lat, lng)

      if (geocoder.current) {
        geocoder.current.geocode(
          { location: { lat, lng } },
          (results, status) => {
            if (
              status === 'OK' &&
              results !== null &&
              results[0] &&
              results[0].formatted_address.indexOf('日本') !== -1
            ) {
              // 文字列"日本"を削除する
              let addressStr = results[0].formatted_address.substring(
                results[0].formatted_address.indexOf('日本') + 3,
              )
              // 郵便番号が含まれている場合取り除く
              if (addressStr.match(/〒/)) {
                const postCode = addressStr.substring(
                  addressStr.indexOf('〒'),
                  9,
                )
                addressStr = addressStr.replace(postCode + ' ', '')
              }

              // 市区町村の種類を配列にまとめる
              const districts = ['市', '区', '町', '村']
              // addressStr の中で最初に見つかる市区町村を取得
              const index = Math.min(
                ...districts
                  .map((district) => addressStr.indexOf(district))
                  .filter((i) => i !== -1),
              )
              // 最初に見つかった市区町村までの文字列を取り出す
              if (index !== Infinity) {
                addressStr = addressStr.substring(0, index + 1)
              }
              updateAddress(addressStr)
            } else {
              updateAddress('')
              console.error('Geocoder failed due to:', status)
            }
          },
        )
      }
    }
  }

  return (
    <Box
      sx={{
        width: {
          md: '550px',
          sm: '300px',
        },
        height: {
          md: '500px',
          sm: '300px',
        },
      }}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={centerLatLng}
        zoom={10}
        onClick={clickSetLatLng}
      ></GoogleMap>
    </Box>
  )
}

export default PostMaps
