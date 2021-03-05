import { Container, Button } from "@components/ui";
import TwitterLogin from 'react-twitter-auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { setUserTokens } from '@utils/cookieManagment'

interface ResponseProps {
    oauth_token: string, 
    oauth_token_secret: string,
    user_id: string
}

export const Login = () => {
    const registerUser = async (response: any) => {
        const token = response.headers.get('x-auth-token')
        response.json().then((response: ResponseProps) => { setUserTokens(response) })
    }
    const handleFailure = () => {
        console.log('failed')
    }
    return (
        <Container clean className="bg-login  bg-right w-screen h-screen">
            <Container className="bg-tint w-screen h-screen">
                <div className="flex flex-col justify-end">
                    <Button width={'50%'} variant={'slim'} className="ml-auto mt-2">
                        Login
                    </Button>
                    <h1 className="text-4xl font-bold leading-10 tracking-wider mt-10 text-white">Easily scan, analyze, and delete your Tweets.</h1>
                    <TwitterLogin
                        className="bg-primary rounded text-xl font-bold text-center text-white p-4 mt-10 hover:bg-white hover:bg-primary"
                        loginUrl="https://correctify-backend.herokuapp.com/api/v1/auth/twitter"
                        onFailure={() => handleFailure()}
                        onSuccess={(response) => registerUser(response)}
                        requestTokenUrl="https://correctify-backend.herokuapp.com/api/v1/auth/twitter/reverse"
                    > Sign Up With Twitter <FontAwesomeIcon icon={faTwitter} />
                    </TwitterLogin>
                    <a className="text-primary shadow-sm mt-5 font-bold text-center text-2xl">Learn More <FontAwesomeIcon icon={faChevronRight} /></a>
                </div>
            </Container>
        </Container>


    )
}

export default Login;