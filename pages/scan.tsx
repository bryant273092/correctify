import Layout from '@components/Layout'
import { useState, useEffect, useRef } from 'react'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getTweets } from '@twitter/dataFetch'
import { getUserTokens } from '@utils/cookieManagment'
import { Button } from '@components/ui'
import Tweet from '@components/tweet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import badWords from '@assets/bad-words.json'
import QueryList from '@components/QueryList'
import SearchBar from '@components/SearchBar'
import Loading from '@components/Loading'
import s from '../styles/scan.module.css'
import { useRouter } from 'next/router'


export const getServerSideProps: GetServerSideProps = async (context) => {
    const userTokens = getUserTokens(context)
    const isAuthenticated = userTokens != undefined
    const pageName = "Search Tweets"
    if (isAuthenticated) {

        return {
            props: {
                userTokens,
                pageName
            }

        }
    }
    return {
        redirect: {
            destination: '/login',
            permanent: false,
        },

    }
}

export default function Scan({ userTokens }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    //Control loading state
    const [isLoading, setisLoading] = useState(false);
    //An array to keep all user tweets
    const [tweets, setTweets] = useState([])
    //Control visibility of Tweets and Other Info
    const [show, setShow] = useState<boolean>(false)
    //List of predetermined default queries *optional
    const defaultQueries = badWords.badWords
    //Control default query selection
    const [defaultSelect, setdefaultSelect] = useState<boolean>(false)
    //list of user entered query 
    //#TODO inspect for malicious input
    const [queries, setQueries] = useState<string[]>([])
    //Manage current input value
    const [query, setQuery] = useState<string>('')
    //Manage array of selected tweets to delete by id
    const [deleteList, setdeleteList] = useState<string[]>([])
    //Joins preselected queries and user entered queries
    const allQueries: Array<string> = (defaultSelect ? defaultQueries.concat(queries) : queries)
    //Function to fetch user tweets, and set loading state
    const router = useRouter()
    const startTweetSearch = () => {
        setisLoading(true)
        const response = getTweets(userTokens)
            .then((response) => JSON.parse(response.body))
            .then((response) => setTweets(response))
            .then(() => setisLoading(false))
            .then(() => setShow(true))
            .then(() => router.push('#results'))

    }

    //Filters tweets based on list of queries
    const filterTweets = () => {
        const filtered = tweets.filter(((tweet: any) => {
            //#Todo use SET of list, to avoid scanning duplicate
            //Split tweet into an array of words
            const splitTweet = tweet.text.split(' ')
            //Iterate through array of tweet words
            for (let i = 0; i < splitTweet.length; i++) {
                //if tweet word is in array of queries return true
                if (allQueries.includes(splitTweet[i])) {
                    return true
                }
            }
            //if no tweet words in query array, return false
            return false
        }))
        return filtered
    }
    const addtoDelete = (tweetId: string) => {
        if (!deleteList.includes(tweetId)) {
            setdeleteList([tweetId].concat(deleteList))
        }
    }
    const removefromDelete = (tweetId: string) => {
        setdeleteList(deleteList.filter((tweet) => tweet != tweetId))
    }
    return (
        <div className="max-w-8xl m-auto">
            <div >
                {/* Search Area */}
                <div className="w-full  pt-2 mb-5 flex items-center flex-col">
                    {/* Heading */}
                    
                    {/* SearchBar */}
                    <SearchBar queries={queries} setQueries={setQueries} query={query} setQuery={setQuery} />
                    {/* Query list */}
                    <QueryList queries={queries} updateQueries={setQueries} />
                    {/* Default Queries Selection */}
                    <div className="w-full px-3 flex flex-row items-center justify-between">
                        <div>
                            <h3 className="text-white font-bold ">Scan for pre-selected words</h3>
                        </div>
                        <div>
                            <label className={s.switch}>
                                <input type="checkbox" />
                                <span className={s.slider}></span>
                            </label>
                        </div>

                    </div>
                    {/* Search Button  */}
                    {/* TODO if user doesn't enter queries, and does not select default queries -> throw message */}
                    <div className="w-full px-3">
                        <Button loading={isLoading} className="w-full whitespace-nowrap mt-3" onClick={() => startTweetSearch()}>Search All <span className="pl-1"><FontAwesomeIcon icon={faSearch} /></span></Button>
                    </div>
                </div>
                {/* Results Area */}
                <div id="results" className={show ? 'block' : 'hidden'}>
                    <h2 className="text-accents-6 px-3 font-bold text-xl mb-4">Results</h2>
                    {/* Match Information */}
                    <div className={s.matchInfoContainer}>

                        <div className={s.infoContainerGridChild}>
                            <div className="">
                                <h2>
                                    <span className="text-white">{filterTweets().length}</span>
                                </h2>
                            </div>
                            <div>
                                <h2 className={s.underlineHeading}>
                                    Tweet Matches
                                </h2>
                            </div>
                        </div>
                        <div className={s.infoContainerGridChild}>
                            <div>
                                <h2>
                                    <span className="text-white">{tweets.length}</span>
                                </h2>
                            </div>
                            <div>
                                <h2 className={s.underlineHeading}>
                                    Words Found
                                </h2>
                            </div>
                        </div>
                        <div className={s.infoContainerGridChild}>
                            <div>
                                <h2>
                                    <span className="text-white">{tweets.length}</span>
                                </h2>
                            </div>
                            <div>
                                <h2 className={s.underlineHeading}>
                                    Tweets Scanned
                                </h2>
                            </div>
                        </div>
                    </div>
                    {/* Query Tweet Matches */}
                    <div className="mt-10">
                        {filterTweets().map((tweet: any) => (
                            <Tweet
                                key={tweet.id}
                                queries={allQueries}
                                tweet={tweet}
                                deleteTweet={(addtoDelete)}
                                removeTweet={removefromDelete}>
                            </Tweet>
                        ))}
                    </div>
                </div>
            </div>
            {/* <Loading loading={isLoading}/> */}
        </div>
    )
}

Scan.Layout = Layout