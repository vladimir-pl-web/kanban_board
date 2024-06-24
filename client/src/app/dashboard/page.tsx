import clsx from 'clsx'
import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import Statistic from '@/screens/statistic/statistic'

export const metadata: Metadata = {
	title: 'Dashboard',
	...NO_INDEX_PAGE,
	description: 'Dashboard'
}

export default function DashboardPage() {
	return (
		<div>
			<Statistic />
		</div>
	)
}
