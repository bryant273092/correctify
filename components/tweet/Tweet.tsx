import { FC, useState, useEffect } from 'react'
import s from './Tweet.module.css'
interface TweetProps {
    tweet: any
    queries: Array<String>
    deleteTweet?: Function
    removeTweet?: Function

}



const Tweet: FC<TweetProps> = ({ tweet, queries, deleteTweet, removeTweet }) => {
    const [checked, setChecked] = useState(false)
    // const highlightWords = () => {
    //     let tweetText = [tweet.text]
    //     for (let i = 0; i < queries.length; i++) {
    //         let temp: any[] = []
    //         tweetText.forEach((string) => {
    //             console.log("String is: ", string)
    //             temp.push(...string.split(queries[i]))
    //         })
    //         tweetText = temp
            
    //     }
    //     console.log(tweetText)
    //     return tweetText
    // }
    const handleClick = () => {
        if (checked && deleteTweet ){
            deleteTweet(tweet.id)
        }
        else if (removeTweet){
            removeTweet(tweet.id)
        }
        else{
            window.alert("broke")
        }
    }
    useEffect(()=> {
        handleClick()
    },[checked])
    // const highlightWords = () => {
    //     let tweetText = tweet.text
    //     for (let i = 0; i < queries.length; i++) {
    //         tweetText = tweetText.replace(queries[i], "<span className='text-red'> " + queries[i] + "</span>")
    //     }
    //     return tweetText
    // }
    return (
        <div className={s.tweetDiv}>
            <div className={s.userInfo}>
                <div>
                    <img className={s.userImage} src={tweet.user.profile_image_url_https} />
                    <div className="flex flex-col">
                        <h1 className="text-white px-2 text-md font-bold">{tweet.user.name}</h1>
                        <h1 className="text-accents-6 px-2 text-md">{"@" + tweet.user.screen_name}</h1>
                    </div>
                </div>
                <div >
                    <input onClick={ () => { 
                        setChecked(!checked)
                        }}className="w-5 bg-primary h-5" type='checkbox'></input>
                </div>
            </div>

            <p className={s.tweetText}>
                {tweet.text.split(" ").map((word: any)=>(
                    queries.includes(word)?
                    <span key={tweet.id} className="text-red font-bold">{word}</span>
                    :
                     " " + word + " "
                ))}
            </p>
        </div>
    )
}

export default Tweet;