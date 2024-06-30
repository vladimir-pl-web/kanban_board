import { useEffect } from "react"
import { TypeUserForm } from "@/types/auth.types"
import{ UseFormReset }from 'react-hook-form'
import { useProfile } from "./useProfile"

export const useInitData = (reset: UseFormReset<TypeUserForm>)=>{
    const {data, isSuccess} = useProfile()

    useEffect(()=>{
        if(isSuccess && data){
            reset({
                email: data.user.email,
                name: data.user.name,
                breakInterval: data.user.breakInterval,
                intervalCount: data.user.intervalCount,
                workInterval: data.user.workInterval
            })
        }

    },[data, isSuccess, reset])
}