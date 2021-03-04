import '../styles/globals.css'
import '@assets/main.css'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { FC } from 'react'

const Noop: FC = ({ children }) => <>{children}</>

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop
  return (<ThemeProvider>
    <Layout pageProps={pageProps}>
      <Component {...pageProps} />
    </Layout>

  </ThemeProvider>)

}

export default MyApp
