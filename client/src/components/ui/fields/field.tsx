import clsx from 'clsx'
import { forwardRef } from 'react'
import styles from './field.module.scss'
import { FieldError } from 'react-hook-form'

interface InputFieldProps {
	id: string
	label: string
	extra?: string
	error?: FieldError | undefined;
	placeholder: string
	variant?: string
	state?: 'error' | 'success'
	disabled?: boolean
	type?: string
	isNumber?: boolean
}

export const Field = forwardRef<HTMLInputElement, InputFieldProps>(
	(
		{ label, id, extra, type, placeholder, state, disabled, isNumber, ...rest },
		ref
	) => {
		return (
			<div className={`${extra}`}>
				<label
					htmlFor={id}
					className={clsx(styles.label)}
				>
					{label}
				</label>
				<input
					ref={ref}
					disabled={disabled}
					type={type}
					id={id}
					placeholder={placeholder}
                    
                    className={clsx(styles.input, extra, {
                        [styles.inputDisabled]: disabled,
                        [styles.error]: state === 'error',
                        [styles.success]: state === 'success',

                    })}
					onKeyDown={event => {
						if (
							isNumber &&
							!/[0-9]/.test(event.key) &&
							event.key !== 'Backspace' &&
							event.key !== 'Tab' &&
							event.key !== 'Enter' &&
							event.key !== 'ArrowLeft' &&
							event.key !== 'ArrowRight'
						) {
							event.preventDefault()
						}
					}}
					{...rest}
				/>
			</div>
		)
	}
)

Field.displayName = 'field'
