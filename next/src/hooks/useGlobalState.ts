// グローバルステートの定義ファイル
// ・・・・全てのReactコンポーネントから参照・変更できるステートのこと
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
