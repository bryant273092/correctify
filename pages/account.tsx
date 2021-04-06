import Layout from '@components/Layout'
import { Button } from '@components/ui'
import { userLogout } from '@utils/cookieManagment'
import { useRouter } from 'next/router'
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

export default function Account() {
    const router = useRouter()
    const handleLogout = () => {
        userLogout()
        router.push('/login')
    }
    return (
        <div className="p-3">
            <div className="w-full pt-4">
                <Button className="w-full" variant={'hollow'} onClick={() => handleLogout()}>Log Out</Button>
            </div>

        </div>
    )
}

Account.Layout = Layout