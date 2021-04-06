import { Container, Button } from "@components/ui";
import TwitterLogin from 'react-twitter-auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { setUserTokens } from '@utils/cookieManagment'
import { useRouter } from 'next/router'
interface ResponseProps {
    oauth_token: string,
    oauth_token_secret: string,
    user_id: string
}

export const Login = () => {
    const router = useRouter()
    const handleResponse = async (response: any) => {
        const token = response.headers.get('x-auth-token')
        response.json().then((response: ResponseProps) => { setUserTokens(response) })
        router.push('/')

    }
    const handleFailure = () => {
        console.log('failed')
    }
    return (
        <Container clean className="bg-login bg-right w-screen h-screen">
            <Container clean className="bg-tint w-screen h-screen">
                <Container>
                    <div className="flex flex-col h-screen items-center justify-center">
                        {/* <Button width={'20%'} variant={'slim'} className="ml-auto mt-2">
                            Login
                        </Button> */}
                        <h1 className="text-4xl font-bold leading-10 tracking-wider mt-10 text-white">Easily analyze and manage your tweets.</h1>
                        <a className="bg-primary rounded text-xl text-center text-white p-4 mt-10 hover:bg-white hover:bg-primary">
                            <TwitterLogin
                                loginUrl="https://correctify-backend.herokuapp.com/api/v1/auth/twitter"
                                onFailure={() => handleFailure()}
                                onSuccess={(response) => handleResponse(response)}
                                requestTokenUrl="https://correctify-backend.herokuapp.com/api/v1/auth/twitter/reverse"
                            > Login With Twitter <FontAwesomeIcon icon={faTwitter} />
                            </TwitterLogin>
                        </a>

                        <a className="text-white shadow-sm mt-5 text-center font-bold text-xl">Learn More <FontAwesomeIcon icon={faChevronRight} /></a>
                    </div>
                </Container>

            </Container>
        </Container>


    )
}

export default Login;