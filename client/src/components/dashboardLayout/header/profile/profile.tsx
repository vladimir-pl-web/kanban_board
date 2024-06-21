"use client"
import { useProfile } from "@/hooks/profile"
import clsx from "clsx"
import { FC, useMemo } from "react"
import styles from './profile.module.scss'
import Loader from "@/components/ui/loader/loader"

const Profile:FC = ()=>{
    const{data,isLoading}= useProfile()

    const userInfo = useMemo(()=>{
      return isLoading ? (
            <Loader />
        ):(
            <div className={clsx(styles.info)}>
                <div className={clsx(styles.infoWrapper)}>
                    <p className={clsx(styles.userName)}>{data?.user.name}</p>
                    <p className={clsx(styles.userMail)}>{data?.user.email}</p>
                </div>
            </div>
        )
    },[data?.user.email, data?.user.name, isLoading])

    return <div className={clsx(styles.profile)}>
            {userInfo}
            <div className={clsx(styles.ava)}>
                {data?.user.name?.charAt(0) || 'A'}
            </div>
    </div>
}

export default Profile