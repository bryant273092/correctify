import Layout from '@components/Layout'
import {Button} from '@components/ui'

import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getUserTokens } from '@utils/cookieManagment'

export const getServerSideProps: GetServerSideProps = async (context) => {
    const userTokens = getUserTokens(context)
    const isAuthenticated = userTokens != undefined
    const pageName = "Account"
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

export default function About () {
    return(
        <div className="p-3">

        </div>
    )
}

About.Layout = Layout