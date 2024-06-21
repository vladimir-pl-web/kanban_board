import clsx from 'clsx'
import { Loader as LoaderIcon } from 'lucide-react'

import styles from './loader.module.scss'

const Loader = () => {
	return (
		<div className={clsx(styles.loader)}>
			<LoaderIcon className={clsx(styles.icon)} />
		</div>
	)
}

export default Loader
