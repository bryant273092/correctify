import Cookies from 'js-cookie'

interface tokenProps {
    oauth_token: string, 
    oauth_token_secret: string,
    user_id: string
}

export const setUserTokens = (tokens: tokenProps) => {
    console.log("tokens: ", tokens)
    Cookies.set('oauthTokens', tokens)
}

export const getUserTokens = () => {
    return Cookies.get('oauthTokens')
}