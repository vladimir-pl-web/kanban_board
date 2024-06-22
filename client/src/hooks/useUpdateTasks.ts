import { Task } from "@/services/task.service"
import { TypeTaskFormState } from "@/types/task.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useUpdateTask = (key?:string)=>{
const queryClient = useQueryClient()

    const{mutate:updateTask, isPending:isTaskUpdatePending} = useMutation({
        mutationKey:['updateTasks', key],
        mutationFn: ({id, data}:{id: string, data: TypeTaskFormState})=>Task.updateTask(id, data),
        onSuccess(){
            toast.success("Successfully updated task!")
            queryClient.invalidateQueries({queryKey:['tasks']})

        }

    })

    return{updateTask, isTaskUpdatePending}
}