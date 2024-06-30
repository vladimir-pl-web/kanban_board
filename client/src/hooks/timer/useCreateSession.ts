import { Timer } from "@/services/timer.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useCreateSession = ()=>{
    const queryClient  = useQueryClient()
    const{mutate:createSession, isPending:isCreatePending} = useMutation({
        mutationKey:['createSession'],
        mutationFn:()=>Timer.createSession(),
        onSuccess(){
            toast.success("session created!")
            queryClient.invalidateQueries({queryKey:['session']})
        }
    })

    return{createSession, isCreatePending}
}