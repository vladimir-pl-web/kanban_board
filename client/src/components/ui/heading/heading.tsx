import clsx from "clsx"
import styles from "./heading.module.scss"

interface IHeading {
	title: string
}

export function Heading({ title }: IHeading) {
	return (
		<div>
			<h1 className={clsx(styles.heading)}>{title}</h1>
			<div />
		</div>
	)
}