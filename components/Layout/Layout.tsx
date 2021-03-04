import cn from 'classnames'
import dynamic from 'next/dynamic'
import s from './Layout.module.css'
import { useRouter } from 'next/router'
import React, { FC, useState, useEffect } from 'react'
import { useUI } from '@components/ui/context'
import  Navbar from '@components/Navbar'
import { Sidebar, Button, Modal, LoadingDots } from '@components/ui'




interface Props {
  pageProps: {
    pages?: any
    settings: object
  }
}

const Layout: FC<Props> = ({ children, pageProps }) => {
  const {
    displaySidebar,
    displayModal,
    closeSidebar,
    closeModal,
    modalView,
  } = useUI()
  // const { acceptedCookies, onAcceptCookies } = useAcceptCookies()
  const { locale = 'en-US' } = useRouter()
  const [isLoading, setisLoading] = useState(true)
  useEffect(() => {
    const timeoutHandle = () => {

      setTimeout(() => {
        setisLoading(false)
      }, 2000)
      return setTimeout
    }
    timeoutHandle()
    clearTimeout()

  }, [isLoading, setisLoading])
  return (
      <div className={cn(s.root)}>
        <Navbar />
        <main className="fit">{children}</main>
        {/* <Footer pages={pageProps.pages} /> */}
      </div>
  )
}

export default Layout
