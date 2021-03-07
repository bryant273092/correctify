import Layout from '@components/Layout'
import { useState } from 'react'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import {getTweets} from '@twitter/dataFetch'
import { getUserTokens } from '@utils/cookieManagment'
import Tweet from '@components/tweet'
export const getServerSideProps: GetServerSideProps = async (context) => {
    const userTokens = getUserTokens(context)
    const isAuthenticated = userTokens != undefined
    if (isAuthenticated) {
        const response = await getTweets(userTokens)
        const userTweets = JSON.parse(response.body)
        return {
            props: {
                userTweets
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

export default function Scan({ userTweets }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    console.log(userTweets)
    return (
        <div>
            {userTweets.map((tweet: any) => (
                <Tweet tweet={tweet}></Tweet>
            ))}
        </div>
    )
}

Scan.Layout = Layout