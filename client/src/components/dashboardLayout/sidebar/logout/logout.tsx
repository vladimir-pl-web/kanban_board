"use client"

import { Auth } from "@/services/auth.service"
import { useMutation } from "@tanstack/react-query"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import styles from './logout.module.scss'
import { LogOut } from "lucide-react"

export function LogoutBtn(){

    const router = useRouter()

    const{mutate} = useMutation({
        mutationKey: ['logout'],
        mutationFn: ()=>Auth.logout(),
        onSuccess: ()=>{
            toast.success("By By!")
            router.push("/auth")
        } 
    })

    return <div className={clsx(styles.logout)}>
        <button 
        onClick={()=>mutate()}
        className={clsx(styles.btn)}>
            <LogOut size={20} />
        </button>

    </div>
}