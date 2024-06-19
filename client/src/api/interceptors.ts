
import { getAccessToken, removeFromStorage } from '@/services/authTokens.service'
import axios, { CreateAxiosDefaults } from 'axios'
import { catchError } from './error'
import { Auth } from '@/services/auth.service'


const options:CreateAxiosDefaults = {
baseURL: process.env.BASE_URL,
headers:{
    'Content-Type': 'application/json'
},
withCredentials: true
}

const axiosBase = axios.create(options)
const axiosAuth = axios.create(options)

axiosAuth.interceptors.request.use(config=>{
    const accessToken = getAccessToken()
    if(config?.headers && accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
})

axiosAuth.interceptors.response.use(
    config=>config,
    async error => {
        const originalRequest = error.config
        if(
            (catchError(error) === 'jwt expired' || 
            error?.response?.status === 401 ||
            catchError(error) === 'jwt must be provided') &&
            error.config && !error.config._isRetry
        ){
            originalRequest._isRetry = true
            try{
                await Auth.getNewTokens()
                return axiosAuth.request(originalRequest)
            } catch(error){
                if(catchError(error) === 'jwt expired') removeFromStorage()
            }
        }


        throw error
    }
)

export {
    axiosBase,
    axiosAuth
}