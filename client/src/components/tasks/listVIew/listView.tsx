'use client'

import { DragDropContext } from '@hello-pangea/dnd'

import { COLUMNS } from '../columns.data'


import styles from './listView.module.scss'
import ListRowParent from './listRowParent/listRowParent'
import clsx from 'clsx'
import { useDNDTask } from '@/hooks/useDNDTask'
import { useTasks } from '@/hooks/useTasks'
import { useMemo } from 'react'

export function ListView() {
	const { tasks ,setTasks } = useTasks()
	const { onDragEnd } = useDNDTask()

    const table = useMemo(()=>{
        return <div className={styles.parentsWrapper}>
        {COLUMNS.map(column => (
            <ListRowParent
                items={tasks}
                label={column.label}
                value={column.value}
                setItems={setTasks}
                key={column.value}
            />
        ))}
    </div>
    },[setTasks, tasks])

	return (
        
		<DragDropContext onDragEnd={onDragEnd}>
			<div className={clsx(styles.listView)}>
				<div className={clsx(styles.header)}>
					<div>Task name</div>
					<div>Due date</div>
					<div>Priority</div>
					<div></div>
				</div>

                {table}
			</div>
		</DragDropContext>
	)
}
