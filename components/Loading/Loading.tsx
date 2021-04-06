import { FC } from 'react'

interface Props
 {
     loading: boolean
 }
const Loading: FC<Props> = ({loading}) => {
    return (
        <div className={"pt-12 " +  (loading? 'block' : 'hidden' )}>
            <img src='/correctify-icon.png' className='m-auto w-1/4 animate-spin' />
        </div>
    )
}

export default Loading;