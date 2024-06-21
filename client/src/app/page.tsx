import clsx from 'clsx'

import styles from './main.module.scss'

export default function Home() {
	return (
		<main className={clsx(styles.main)}>
			<h1 className='text-white'>Hello world</h1>
		</main>
	)
}
