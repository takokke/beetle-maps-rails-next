import { css } from '@emotion/react'

// calc(画面の100%の高さ - ヘッダーの高さ)
export const styles = {
  pageMinHeight: css({
    minHeight: 'calc(100vh - 64px)',
  }),
}
