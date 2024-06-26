"use client"
import { FC, useCallback } from "react"
import styles from "./switcherView.module.scss"
import clsx from "clsx"
import { IView } from "@/types/task.types"
import { Kanban, ListTodo } from "lucide-react"


interface ISwitcherView{
    setType: (data:IView) => void
    type: IView
}
const SwitcherView:FC<ISwitcherView> = ({setType, type})=>{

const onClickHandler = useCallback((data:IView )=>{
    setType(data)
},[setType])

return <div
className={clsx(styles.switcherView)}
>
    <button
    className={clsx(styles.btn, {
        ["opacity-40"]: type === IView.Kanban
    })}
    onClick={()=> onClickHandler(IView.List)}
    >
    <ListTodo className="w-10 h-10"/>
    </button>
    <button
    className={clsx(styles.btn, {
        ["opacity-40"]: type === IView.List
    })}
    onClick={()=> onClickHandler(IView.Kanban)}
    >
    <Kanban className="w-10 h-10"/>
    </button>
</div>
}

export default SwitcherView