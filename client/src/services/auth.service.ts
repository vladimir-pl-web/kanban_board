import { axiosBase } from "@/api/interceptors";
import { IAuthForm, IAuthResponse } from "@/types/auth.types";
import { removeFromStorage, saveToken } from "./authTokens.service";

class AuthService {
    async main(type: 'login' | 'register', data: IAuthForm){
        const res = await axiosBase.post<IAuthResponse>(`/auth/${type}`, data)

        if(res.data.accessToken) saveToken(res.data.accessToken)

        return res
    }

    async getNewTokens() {
        const res = await axiosBase.post<IAuthResponse>(`/auth/login/access-token`)
        if(res.data.accessToken) saveToken(res.data.accessToken)

        return res
    }

    async logout(){
        const res = await axiosBase.post<boolean>(`/auth/logout`)

        if(res.data) removeFromStorage()
    }
}

export const Auth = new AuthService()

