import cn from 'classnames'
import Link from 'next/link'
import { FC, useRef, useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import s from './DropdownMenu.module.css'
import { Moon, Sun } from '@components/icons'
import { useUI } from '@components/ui/context'
import ClickOutside from '@lib/click-outside'
import { Hamburger, Cross } from '@components/icons'

import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'


interface DropdownMenuProps {
  open?: boolean
  hasScrolled: boolean
}

const LINKS = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Garments',
    href: '/garments',
  },
  {
    name: 'About',
    href: '/about'
  },
  {
    name: 'My Bag',
    href: '/cart',
  },
]

const DropdownMenu: FC<DropdownMenuProps> = ({ open = false, hasScrolled }) => {
  const { pathname } = useRouter()
  const { theme, setTheme } = useTheme()
  const [display, setDisplay] = useState(false)
  const { closeSidebarIfPresent } = useUI()
  const ref = useRef() as React.MutableRefObject<HTMLUListElement>
  useEffect(() => {
    if (ref.current) {
      if (display) {
        disableBodyScroll(ref.current)
      } else {
        enableBodyScroll(ref.current)
      }
    }
    return () => {
      clearAllBodyScrollLocks()
    }
  }, [display])

  return (
    <ClickOutside active={display} onClick={() => setDisplay(false)}>
      <div className={"my-auto " + display ? 'z-10' : ''}>
        <button

          onClick={() => setDisplay(!display)}
          aria-label="Menu"
        >
          {
            display ?
              <Cross color={'#00a2f9'}/>
              :
              <Hamburger color={'#00a2f9'} />
          }

        </button>
        {display && (
          <ul className={s.dropdownMenu} ref={ref}>
            {LINKS.map(({ name, href }) => (
              <li key={href}>
                <div>
                  <Link href={href}>
                    <a
                      className={cn(s.link, {
                        [s.active]: pathname === href,
                      }) + " text-primary"}
                      onClick={() => {
                        setDisplay(false)
                        closeSidebarIfPresent()
                      }}
                    >
                      {name}
                    </a>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ClickOutside>
  )
}

export default DropdownMenu
