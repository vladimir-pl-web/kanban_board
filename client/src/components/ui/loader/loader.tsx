import clsx from 'clsx'
import styles from "./loader.module.scss"
import { Loader as LoaderIcon } from 'lucide-react'

const Loader = () => {
	return (
		<div className={clsx(styles.loader)}>
			<LoaderIcon className={clsx(styles.icon)} />
		</div>
	)
}

export default Loader
