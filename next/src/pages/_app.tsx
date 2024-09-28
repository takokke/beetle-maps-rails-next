import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { LoadScript } from '@react-google-maps/api'
import { AppProps } from 'next/app'
import * as React from 'react'
import '@/styles/destyle.css'
import CurrentUserFetch from '@/components/CurrentUserFetch'
import GetCurrentPosition from '@/components/GetCurrentPosition'
import Header from '@/components/Header'
import Loading from '@/components/Loading'
import SuccessSnackbar from '@/components/Snackbar'
import createEmotionCache from '@/styles/createEmotionCache'
import theme from '@/styles/theme'

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY || ''

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps): JSX.Element {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <GetCurrentPosition />
        <CurrentUserFetch />
        <Header />
        <LoadScript loadingElement={<Loading />} googleMapsApiKey={apiKey}>
          <Component {...pageProps} />
        </LoadScript>
        <SuccessSnackbar />
      </ThemeProvider>
    </CacheProvider>
  )
}
