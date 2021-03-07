import Head from 'next/head'
import Layout from '@components/Layout'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getUserTokens } from '@utils/cookieManagment'
import { getUser } from '@twitter/dataFetch'
import { Container, Button } from '@components/ui'
import Link from 'next/link'
export const getServerSideProps: GetServerSideProps = async (context) => {
  const userTokens = getUserTokens(context)
  const isAuthenticated = userTokens != undefined
  if (isAuthenticated) {
    const response = await getUser(userTokens)
    const userInfo = JSON.parse(response.body)
    return {
      props: {
        userInfo
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
export default function Home({ userInfo }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log("user info is: ", userInfo)
  return (
    <Container >
      {/* Image */}
      <div className="w-full py-2">
        <img className="rounded-full w-1/4" src={userInfo.profile_image_url}></img>
      </div>
      {/* Names */}
      <div className="">
        <h2 className="text-white text-lg font-bold">{userInfo.name}</h2>
        <h2 className="text-accents-6">@{userInfo.screen_name}</h2>
      </div>
      {/* Account Details */}
      <div className="flex flex-col">
        <div className="flex flex-row w-full h-auto mt-3 justify-between">
          <div className="w-1/3 ">
            <h3 className="font-bold text-white">
              Followers
          </h3>
            <h4 className="font-bold   text-accents-6">
              {userInfo.followers_count}
            </h4>
          </div>
          <div className="w-1/3 ">
            <h3 className="font-bold text-white">
              Following
          </h3>
            <h4 className="font-bold  text-accents-6">
              {userInfo.friends_count}
            </h4>
          </div>
          <div className="w-1/3 ">
            <h3 className="font-bold text-white">
              Unfollowers
          </h3>
            <h4 className="font-bold  text-accents-6">
              {userInfo.statuses_count}
            </h4>
          </div>
        </div>
        <div className="flex flex-row w-full h-auto mt-3 justify-between">
          <div className="w-1/3 ">
            <h3 className="font-bold text-white">
              Tweets
          </h3>
            <h4 className="font-bold  text-accents-6">
              {userInfo.statuses_count}
            </h4>
          </div>
          <div className="w-1/3 ">
            <h3 className="font-bold text-white">
              Likes
          </h3>
            <h4 className="font-bold  text-accents-6">
              {userInfo.favourites_count}
            </h4>
          </div>
          <div className="w-1/3 " >
            <h3 className="font-bold text-white">
              Follow Ratio
          </h3>
            <h4 className="font-bold   text-accents-6">
              {(userInfo.followers_count / userInfo.friends_count).toFixed(2)}
            </h4>
          </div>

        </div>
      </div>
      {/* Call to action */}
      <div className="w-full flex mt-4 flex-row justify-between items-center">
        <Link href="/scan">
          <Button
            width={'48%'}
            variant={'slim'}
            style={{ border: "2px solid #00a2f9" }}
            className="whitespace-nowrap"> Scan Tweets
          </Button>
        </Link>
        <Link href='/scan'>
          <Button
            href='/scan'
            width={'48%'}
            variant={'slim'}
            style={{ backgroundColor: "transparent", border: "2px solid #00a2f9", color: "#00a2f9" }}
            className=" whitespace-nowrap"> Scan Followers</Button>
        </Link>
      </div>

    </Container>
  )
}

Home.Layout = Layout