import { useEffect } from "react"
import { useProfile } from "./useProfile"
import { TypeUserForm } from "@/types/auth.types"
import{ UseFormReset }from 'react-hook-form'

export const useInitData = (reset: UseFormReset<TypeUserForm>)=>{
    const {data, isSuccess} = useProfile()

    useEffect(()=>{
        if(isSuccess && data){
            reset({
                email: data.user.email,
                name: data.user.name,
                breakInterval: data.user.breakInterval,
                intervalsCount: data.user.intervalsCount,
                workInterval: data.user.workInterval
            })
        }

    },[data, isSuccess, reset])
}