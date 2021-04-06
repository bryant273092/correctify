import Head from 'next/head'
import Layout from '@components/Layout'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getUserTokens } from '@utils/cookieManagment'
import { getUser } from '@twitter/dataFetch'
import { Container, Button } from '@components/ui'
import Link from 'next/link'
import { useDispatch } from 'react-redux'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userTokens = getUserTokens(context)
  const isAuthenticated = userTokens != undefined
  
  if (isAuthenticated) {
    const response = await getUser(userTokens)
    const userInfo = JSON.parse(response.body)
    const pageName = "Home"
    return {
      props: {
        userInfo,
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
export default function Home({ userInfo }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const dispatch = useDispatch()
  dispatch({
    type: 'updateUser',
    userInfo: userInfo
  })
  return (
    <Container >
      {/* Image */}
      <div className="w-full py-2">
        <img className="rounded-full m-auto w-1/4" src={userInfo.profile_image_url}></img>
      </div>
      {/* Names */}
      <div className="text-center">
        <h2 className="text-white text-lg font-bold">{userInfo.name}</h2>
        <h2 className="text-accents-6">@{userInfo.screen_name}</h2>
      </div>
      {/* Account Details */}
      <div className="flex flex-col mt-3">
        <div className="flex flex-row w-full text-center h-auto mt-3 justify-between">
          <div className="w-1/3 ">
            <h4 className="font-bold  text-white">
              {userInfo.followers_count}
            </h4>
            <h4 className="text-accents-6">
              Followers
            </h4>

          </div>
          <div className="w-1/3 ">
            <h4 className="font-bold  text-white">
              {userInfo.friends_count}
            </h4>
            <h4 className="text-accents-6">
              Following
          </h4>

          </div>
          <div className="w-1/3 ">
            <h4 className="font-bold  text-white">
              {userInfo.statuses_count}
            </h4>
            <h4 className="text-accents-6">
              Unfollowers
          </h4>

          </div>
        </div>
        <div className="flex flex-row w-full text-center h-auto mt-5 justify-between">
          <div className="w-1/3 ">
            <h4 className="font-bold  text-white">
              {userInfo.statuses_count}
            </h4>
            <h4 className="text-accents-6">
              Tweets
          </h4>

          </div>
          <div className="w-1/3 ">
            <h4 className="font-bold  text-white">
              {userInfo.favourites_count}
            </h4>
            <h4 className="text-accents-6">
              Likes
          </h4>

          </div>
          <div className="w-1/3 " >
            <h4 className="font-bold  text-white">
              {(userInfo.followers_count / userInfo.friends_count).toFixed(2)}
            </h4>
            <h4 className="text-accents-6">
              Follow Ratio
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