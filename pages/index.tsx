import Head from 'next/head'
import Layout from '@components/Layout'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getUserTokens } from '@utils/cookieManagment'
export const getServerSideProps: GetServerSideProps = async (context) => {
  const isAuthenticated = getUserTokens() != undefined
  if (isAuthenticated) {
    return {
      props: {
        isAuthenticated
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
export default function Home({ isAuthenticated }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div >

    </div>
  )
}

Home.Layout = Layout