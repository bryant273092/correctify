import { FC } from 'react'
interface Props {
      icon: boolean
}
const Logo: FC<Props> = ({ icon = true }) => {
      return (
            <div >
            {icon ?
                  <img className="h-14 w-auto" src="/correctify-icon.png"></img>
                  :
                  <img src="/correctify-logo.png"></img>}
            </div>
      )
}



export default Logo
