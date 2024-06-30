import { Timer } from "@/services/timer.service"
import {  useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useDeleteSession = (onDeleteSuccess: ()=>void)=>{
    const queryClient = useQueryClient()
    const{mutate:deleteSession, isPending:isDeletePending} = useMutation({
        mutationKey:['deleteSession'],
        mutationFn:(id:string)=>Timer.deleteSession(id),
        onSuccess(){
            toast.success("session deleted!"),
            queryClient.invalidateQueries({queryKey:['session']}),
            onDeleteSuccess()
        }
    })

    return{deleteSession, isDeletePending}
}