import clsx from "clsx";
import { InputHTMLAttributes, forwardRef } from 'react'
import styles from './field.module.scss'



type TransparentFieldType = InputHTMLAttributes<HTMLInputElement>

export const TransparentField = forwardRef<
HTMLInputElement,
 TransparentFieldType
 >(({className, ...rest}, ref)=>{
    return(
        <input
        ref={ref}
        className={clsx(styles.transparentField, className)}
        {...rest}
        />
    )
})

TransparentField.displayName = 'TransparentField';
