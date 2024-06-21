
import { User } from "@/services/user.service"
import { useQuery } from "@tanstack/react-query"

export const useProfile = ()=>{

    const{data, isLoading} = useQuery({
        queryKey:['profile'],
        queryFn: ()=>User.getProfile()
    })

    return {data, 
        isLoading}
}