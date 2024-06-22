import clsx from 'clsx'
import { Metadata } from 'next'

import styles from './tasks.module.scss'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import TaskView from '@/screens/tasks/tasks'


export const metadata: Metadata = {
	title: 'Tasks',
	...NO_INDEX_PAGE,
	description: 'Tasks'
}

export default function TasksPage() {
	return (
		<div className={clsx(styles.tasks)}>
			<TaskView />
		</div>
	)
}
