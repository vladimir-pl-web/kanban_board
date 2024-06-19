import Cookies from 'js-cookie'

export enum ETokens{
    ACCESS_TOKEN = 'accessToken',
    REFRESH_TOKEN = 'refreshToken'
}


export const getAccessToken = () =>{
    const accessToken = Cookies.get(ETokens.ACCESS_TOKEN)
    return accessToken || null
}

export const saveToken = (accessToken: string)=>{
    Cookies.set(ETokens.ACCESS_TOKEN, accessToken,{
        domain: 'localhost',
        sameSite: 'strict',
        expires: 1
    })
}

export const removeFromStorage = ()=>{
    Cookies.remove(ETokens.ACCESS_TOKEN)
}