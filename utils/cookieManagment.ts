import Cookies from 'js-cookie'

export interface tokenProps {
    oauth_token: string, 
    oauth_token_secret: string,
    user_id: string
}

interface contextProps{
    req: any,
    res: any
}

export const setUserTokens = (tokens: tokenProps) => {
    Cookies.set('oauthTokens', tokens)
    
}

export const getUserTokens = (context: contextProps) => {
    const cookieString = context.req.cookies.oauthTokens
    if (cookieString){
        return JSON.parse(cookieString)
    }
    return undefined
}

export const userLogout = () => {
    Cookies.remove('oauthTokens')
}