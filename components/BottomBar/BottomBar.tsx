import { FC } from 'react'
import s from './BottomBar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react'
import Link from 'next/link'
import { faCog, faHome, faSearch, faBars, faTimes, faSignOutAlt, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
const BottomBar: FC = () => {
    const router = useRouter()
    const [active, setActive] = useState(router.pathname)
    if(active != router.pathname){
        setActive(router.pathname)
    }
    return (
        <div className={s.root}>
            <Link href='/'>
                <div className={s.tab}>
                    <FontAwesomeIcon style={{ width: '100%', margin: 'auto' }} className={"text-center text-2xl m-auto " + (active == '/' ? 'text-primary': 'text-accents-6')} icon={faHome} />
                </div>
            </Link>
            <Link href='/scan'>
                <div className={s.tab}>
                    <FontAwesomeIcon style={{ width: '100%', margin: 'auto' }} className={"text-center text-2xl m-auto " + (active == '/scan' ? 'text-primary': 'text-accents-6')} icon={faSearch} />
                </div>
            </Link>
            <Link href="/account">
                <div className={s.tab}>
                    <FontAwesomeIcon style={{ width: '100%', margin: 'auto' }} className={"text-center text-2xl m-auto " + (active == '/account' ? 'text-primary': 'text-accents-6')} icon={faCog} />
                </div>
            </Link>
            <Link href='/about'>
                <div className={s.tab}>
                    <FontAwesomeIcon style={{ width: '100%', margin: 'auto' }} className={"text-center text-2xl m-auto " + (active == '/about' ? 'text-primary': 'text-accents-6')} icon={faQuestionCircle} />
                </div>
            </Link>



        </div>
    )
}
export default BottomBar;