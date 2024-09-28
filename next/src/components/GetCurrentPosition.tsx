import { useEffect } from 'react'
import { useCurrentLocation } from '@/hooks/useGlobalState'

const GetCurrentPosition = () => {
  const [, setCurrentPosition] = useCurrentLocation()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        // 現在地の緯度・経度をsetする
        setCurrentPosition({ lat: latitude, lng: longitude })
      },
      (error) => {
        console.error('Error fetching current location:', error)
        setCurrentPosition({ lat: 35.7022589, lng: 139.7744733 })
      },
    )
  })

  return <></>
}

export default GetCurrentPosition
