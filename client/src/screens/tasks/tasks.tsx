"use client"
import { Heading } from "@/components/ui/heading/heading"
import { FC } from "react"
import styles from './tasks.module.scss'
import ListView from "@/components/tasks/listVIew/listView"



const TaskView:FC = ()=>{
    return<div>
        <Heading title='Tasks' />
        <ListView />

    </div>
}

export default TaskView