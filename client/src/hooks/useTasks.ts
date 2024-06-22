import { Task } from "@/services/task.service"
import { ITaskResponse } from "@/types/task.types"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

export const useTasks  =()=>{
    const{data, isLoading} = useQuery({
        queryKey:['tasks'],
        queryFn: ()=>Task.getTasks()
    })
    const[tasks,setTasks] = useState<ITaskResponse[] | undefined>(data?.data)

    useEffect(()=>{
        if(data){
            setTasks(data.data)
        }
    },[data])

    return{tasks ,setTasks, isLoading}
}