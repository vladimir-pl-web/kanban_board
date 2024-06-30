import { Task } from "@/services/task.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { TypeTaskFormState } from '@/types/task.types';
import { toast } from "sonner";

export const useCreateTask = ()=>{
    const queryClient  = useQueryClient()

    const{mutate:createTask, isPending:isCreatePending} = useMutation({
        mutationKey:['createTask'],
        mutationFn:(data:TypeTaskFormState)=>Task.createTask(data),
        onSuccess(){
            toast.success("Task created!")
            queryClient.invalidateQueries({queryKey:['tasks']})
        }
    })
    return{createTask, isCreatePending}
}