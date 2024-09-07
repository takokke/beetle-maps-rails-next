// グローバルステートの定義ファイル
// ・・・・全てのReactコンポーネントから参照・変更できるステートのこと
import { useEffect } from 'react'
import useSWR from 'swr'
import { snackbarStateType } from '@/types/snackbarStateType'
import { userStateType } from '@/types/userStateType'

// カスタムフック "useUserState"
export const useUserState = () => {
  const fallbackData: userStateType = {
    id: 0,
    name: '',
    email: '',
    isSignedIn: false,
    isFetched: false,
  }

  // オブジェクトのプロパティを別名で展開する
  const { data: state, mutate: setState } = useSWR('user', null, {
    fallbackData: fallbackData, // 初期値の設定
  })

  return [state, setState] as [userStateType, (value: userStateType) => void]
}

// カスタムフック "useSnackbarState"
export const useSnackbarState = () => {
  const fallbackData: snackbarStateType = {
    message: null,
    severity: null,
    pathname: null,
  }

  const { data: state, mutate: setState } = useSWR('snackbar', null, {
    fallbackData: fallbackData,
  })

  return [state, setState] as [
    snackbarStateType,
    (value: snackbarStateType) => void,
  ]
}

type LatLng = {
  lat: number
  lng: number
}

export const useCurrentLocation = () => {
  const fallbackData: LatLng = {
    lat: 35.7022589,
    lng: 139.7744733,
  }

  const { data: state, mutate: setState } = useSWR<LatLng>('currentLocation', {
    fallbackData,
  })

  useEffect(() => {
    const handleSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords
      const newLocation: LatLng = { lat: latitude, lng: longitude }
      setState(newLocation)
    }

    const handleError = (error: GeolocationPositionError) => {
      console.error('Error fetching current location:', error)
    }

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError)

    // Cleanup function if needed
    return () => {
      // You can implement cleanup logic if required
    }
  }, [setState])

  return [state, setState] as [LatLng, (value: LatLng) => void]
}
