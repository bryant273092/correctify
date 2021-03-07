import { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import { Logo, Container } from '@components/ui'
import cn from 'classnames'
import throttle from 'lodash.throttle'
import DropdownMenu from './DropdownMenu'

const Navbar: FC = () => {
  const [hasScrolled, setHasScrolled] = useState(false)
  useEffect(() => {
    const handleScroll = throttle(() => {
      const offset = 0
      const { scrollTop } = document.documentElement
      const scrolled = scrollTop > offset
      setHasScrolled(scrolled)
    }, 200)

    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <div>
      <div className={cn(s.root, { 'shadow-magical': hasScrolled })}>

        <Container>
          <div className={s.subroot}>

            <div className="flex items-center flex-1">
              <div className='flex flex-1 lg:hidden '>
                <DropdownMenu hasScrolled={hasScrolled} />
              </div>
              <nav className={cn("hidden space-x-4 lg:flex justify-around flex-row w-full", { 'text-black': hasScrolled }, { 'text-white': !hasScrolled })}>
                <Link href="/">
                  <a className={s.link}>Home</a>
                </Link>
                <Link href="/garments">
                  <a className={s.link}>Garments</a>
                </Link>
                <Link href="/about">
                  <a className={s.link}>About</a>
                </Link>
              </nav>
            </div>
            <div className="flex flex-1 justify-center my-2">
              <Link href="/">
                <a className={s.logo} aria-label="Logo">
                  <Logo icon />
                </a>
              </Link>
            </div>
            <div className="flex flex-1"></div>
          </div>
        </Container>
      </div>
      <div className={'h-16'} />
    </div>
  )
}

export default Navbar
