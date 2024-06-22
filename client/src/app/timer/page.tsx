import clsx from 'clsx'
import { Metadata } from 'next'

import styles from './timer.module.scss'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'


export const metadata: Metadata = {
	title: 'Timer',
	...NO_INDEX_PAGE,
	description: 'Timer'
}

export default function TimerPage() {
	return (
		<div className={clsx(styles.timer)}>
			<>Timer</>
		</div>
	)
}
