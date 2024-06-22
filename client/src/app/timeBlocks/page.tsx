import clsx from 'clsx'
import { Metadata } from 'next'

import styles from './timeBlocks.module.scss'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'


export const metadata: Metadata = {
	title: 'TimeBlocks',
	...NO_INDEX_PAGE,
	description: 'TimeBlocks'
}

export default function TimeBlocksPage() {
	return (
		<div className={clsx(styles.timeBlocks)}>
			<>TimeBlocks</>
		</div>
	)
}
