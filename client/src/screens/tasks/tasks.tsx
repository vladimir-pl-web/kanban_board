"use client"
import { FC } from 'react'

import styles from './tasks.module.scss'
import { KanbanView } from '@/components/tasks/kanbanView/kambanView'
import { ListView } from '@/components/tasks/listVIew/listView'
import SwitcherView from '@/components/tasks/switcherView/switcherView'
import { Heading } from '@/components/ui/heading/heading'
import Loader from '@/components/ui/loader/loader'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { IView } from '@/types/task.types'

const TaskView: FC = () => {
	const [value, setValue, isLoading] = useLocalStorage<IView>({
		key: 'view-type',
		defaultValue: IView.List
	})
	return (
		<div className={styles.tasks}>
			<Heading title='Tasks' />
			{isLoading && <Loader />}
			<SwitcherView type={value} setType={setValue} />
			{value === IView.List ? <ListView /> : <KanbanView />}
		</div>
	)
}

export default TaskView
