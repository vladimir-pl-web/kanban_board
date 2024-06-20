import clsx from 'clsx'
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import styles from "./button.module.scss"

type TypeButton = ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
	children,
	className,
	...rest
}: PropsWithChildren<TypeButton>) {
	return (
		<button
			className={clsx(
				styles.button,
				className
			)}
			{...rest}
		>
			{children}
		</button>
	)
}
