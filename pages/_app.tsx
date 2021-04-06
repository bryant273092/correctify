import '../styles/globals.css'
import '@assets/main.css'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { FC } from 'react'
import { Provider } from 'react-redux'
import { useStore } from '../store'

const Noop: FC = ({ children }) => <>{children}</>

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop
  const store = useStore(pageProps.initialReduxState)
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  )

}

export default MyApp
