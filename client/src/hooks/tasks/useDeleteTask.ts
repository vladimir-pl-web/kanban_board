import { Task } from "@/services/task.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useDeleteTask = ()=>{
    const queryClient  = useQueryClient()

    const{mutate:deleteTask, isPending:isDeletePending} = useMutation({
        mutationKey:['createTask'],
        mutationFn:(id:string)=>Task.deleteTask(id),
        onSuccess(){
            toast.success("Task deleted!")
            queryClient.invalidateQueries({queryKey:['tasks']})
        }
    })
    return{deleteTask, isDeletePending}

}