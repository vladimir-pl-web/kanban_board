'use client'

import { DragDropContext } from '@hello-pangea/dnd'

import { COLUMNS } from '../columns.data'


import styles from './kanbanView.module.scss'
import clsx from 'clsx'
import { useTasks } from '@/hooks/tasks/useTasks'
import { useMemo } from 'react'
import KanbanColumn from './kanbanColumn/kanbanColumn.tsx'
import { useDNDTask } from '@/hooks/tasks/useDNDTask'

export function KanbanView() {
	const { tasks ,setTasks } = useTasks()
	const { onDragEnd } = useDNDTask()

    const table = useMemo(()=>{
        return COLUMNS.map(column => (
            <KanbanColumn
                items={tasks}
                label={column.label}
                value={column.value}
                setItems={setTasks}
                key={column.value}
            />
        ))
    },[setTasks, tasks])

	return (
        
		<DragDropContext onDragEnd={onDragEnd}>
			<div className={clsx(styles.board)}>
                {table}
			</div>
		</DragDropContext>
	)
}
