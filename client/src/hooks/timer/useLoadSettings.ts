import { useProfile } from "../profile/useProfile"

export const useLoadSettings = ()=>{
    const {data} = useProfile()

    const workInterval = data?.user.workInterval ?? 50
    const breakInterval = data?.user.breakInterval ?? 10
    return{workInterval, breakInterval}
}