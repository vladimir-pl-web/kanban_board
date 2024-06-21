"use client"
import Loader from "@/components/ui/loader/loader"
import { useIsFetching, useIsMutating } from "@tanstack/react-query"
import clsx from "clsx"
import styles from './globalLoader.module.scss'

export function GlobalLoader(){
    const isMutating = useIsMutating()
    const isFetching = useIsFetching()


    return isMutating || isFetching ? (
        <div className={clsx(styles.globalLoader)}>
        <Loader />
        </div>
    ): null
}