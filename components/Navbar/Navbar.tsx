import { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import { Logo, Container } from '@components/ui'
import cn from 'classnames'
import throttle from 'lodash.throttle'
import DropdownMenu from './DropdownMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import type { State } from '../../store'
interface Props {
  pageName: string
}


const Navbar: FC<Props> = ({ pageName }) => {
  const [hasScrolled, setHasScrolled] = useState(false)
  // const state = useSelector((state: State) => state)
  // console.log(state)
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

            <div className="flex items-center flex-auto justify-center m-auto">
              <div className='flex flex-1 items-center lg:hidden '>
                <DropdownMenu hasScrolled={hasScrolled} />
                <h1 className="text-white px-3 text-xl whitespace-nowrap  font-bold ">{pageName}</h1>
              </div>
              {/* <nav className={cn("hidden space-x-4 lg:flex justify-around flex-row w-full", { 'text-black': hasScrolled }, { 'text-white': !hasScrolled })}>
                <Link href="/">
                  <a className={s.link}>Home</a>
                </Link>
                <Link href="/garments">
                  <a className={s.link}>Garments</a>
                </Link>
                <Link href="/about">
                  <a className={s.link}>About</a>
                </Link>
              </nav> */}
            </div>
            {/* <div className="flex flex-1 justify-center ">
              <Link href="/">
                <a className={s.logo} aria-label="Logo">
                  <Logo icon />
                  <img className="h-1/2" src={'/correctify-white.png'}></img>
                </a>
              </Link>
            </div> */}
            <div className="flex flex-1 h-full justify-end items-end">
              <FontAwesomeIcon className="h-full color-red" size={'lg'} icon={faCog} />
            </div>
          </div>
        </Container>
      </div>
      <div className={'h-16'} />
    </div>
  )
}

export default Navbar
