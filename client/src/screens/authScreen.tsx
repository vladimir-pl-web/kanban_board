"use client"

import { SubmitHandler, useForm } from 'react-hook-form'

import styles from './authScreen.module.scss'
import clsx from "clsx"

import { FC, useCallback, useState } from "react"
import { IAuthForm } from '@/types/auth.types'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { Auth } from '@/services/auth.service'
import { toast } from 'sonner'
import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { Heading } from '@/components/ui/heading/heading'
import { Field } from '@/components/ui/fields/field'
import { emailValidation } from '@/utils/email'
import { Button } from '@/components/ui/button/button'

const AuthScreen:FC = ()=>{
    const {
        register,
        formState: { errors },
        reset,
        handleSubmit} = useForm<IAuthForm>({
        mode: 'onChange'
    })
    const[isLogin, setIsLogin] = useState<boolean>(false)
    const {push} = useRouter()

    const {mutate} = useMutation({
        mutationKey: ['auth'],
        mutationFn: (data:IAuthForm)=> Auth.main(isLogin ? 'login': 'register', data),
        onSuccess(){
            toast.success("Successfully login!")
            reset()
            push(DASHBOARD_PAGES.HOME)
        }
    })

    const onAuthHandler = useCallback((data:boolean)=>{
        setIsLogin(data)
    },[])

    const onSubmit:SubmitHandler<IAuthForm> = data => {
        mutate(data)
    }

    return <div className={clsx(styles.screen)}>
        <form 
        className={clsx(styles.form)}
        onSubmit={handleSubmit(onSubmit)}
        >
        <Heading title="Auth" />
        <Field 
        id='email'
        label='Email'
        placeholder='Enter email'
        error={errors.email}
        extra='mb-4'
        {...register('email',{
            required: 'Email is required',
            pattern:{
                value: emailValidation,
                message: "Please enter a valid email", 
            }
        })}
        />

    <Field 
        id='password'
        label='Password'
        placeholder='Enter Password'
        extra='mb-6'
        error={errors.password}
        {...register('password',{
            required: 'Password is required',
            minLength:{
                value: 6,
                message: "Password must be at least 5 characters"
            }
        })}
        />

        <div className={clsx(styles.btns)}>
        <Button onClick={()=>onAuthHandler(true)}>Login</Button>
        <Button onClick={()=>onAuthHandler(false)}>Register</Button>
        </div>
        </form>
        
    </div>
}

export default AuthScreen