"use client"
import { FC } from "react"
import styles from './listView.module.scss'
import { useTasks } from "@/hooks/useTasks"

const ListView:FC = ()=>{
    const{tasks ,setTasks, isLoading} = useTasks()
    
return <div>

</div>
}

export default ListView