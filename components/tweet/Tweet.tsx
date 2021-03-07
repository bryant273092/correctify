import { FC } from 'react'

interface TweetProps{
    tweet: any
    
}


const Tweet: FC<TweetProps> = ({tweet}) => {
    return (
        <div className='border-t border-accents-6 h-auto py-2 w-full'>{tweet.text}</div>
    )
}

export default Tweet;