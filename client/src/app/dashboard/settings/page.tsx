import clsx from 'clsx'
import { Metadata } from 'next'

import styles from './settings.module.scss'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import Settings from '@/screens/settings/settings'

export const metadata: Metadata = {
	title: 'Settings',
	...NO_INDEX_PAGE,
	description: 'Settings'
}

export default function SettingsPage() {
	return (
		<div className={clsx(styles.settings)}>
			<Settings />
		</div>
	)
}
