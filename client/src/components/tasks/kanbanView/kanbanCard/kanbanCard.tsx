import clsx from 'clsx'
import { GripVertical, Loader, Trash } from 'lucide-react'
import type { Dispatch, FC, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'

import styles from './kanbanCard.module.scss'
import Checkbox from '@/components/ui/checkbox/checkbox'
import { DatePicker } from '@/components/ui/task/dayPicker/datePicker'
import Select from '@/components/ui/task/select/select'
import type { ITaskResponse, TypeTaskFormState } from '@/types/task.types'
import { useDeleteTask } from '@/hooks/tasks/useDeleteTask'
import { TransparentField } from '@/components/ui/fields/transparentField'
import { useTaskDebounce } from '@/hooks/tasks/useTaskDebounce'



interface IKanbanCard {
	item: ITaskResponse
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

const KanbanCard: FC<IKanbanCard> = ({ item, setItems }) => {
	const { watch, register, control } = useForm<TypeTaskFormState>({
		defaultValues: {
			name: item.name,
			isCompleted: item.isCompleted,
			createdAt: item.createdAt,
			priority: item.priority
		}
	})

	useTaskDebounce({ watch, itemId: item.id })
    const { deleteTask, isDeletePending } = useDeleteTask()

	return (
		<div
			className={clsx(styles.card, {
				[styles.completed]: watch('isCompleted')
			})}
		>
			<div className={styles.cardHeader}>
					<button aria-describedby='todo-item'>
						<GripVertical className={styles.grip} />
					</button>
					<Controller
						control={control}
						name='isCompleted'
						render={({ field: { value, onChange } }) => (
							<Checkbox onChange={onChange} checked={value} />
						)}
					/>
					<TransparentField {...register('name')} />
			</div>
			<div className={styles.cardBody}>
				<Controller
					control={control}
					name='createdAt'
					render={({ field: { value, onChange } }) => (
						<DatePicker 
						onChange={onChange} 
						value={value || ''}
						position='left'
						/>
					)}
				/>
				<Controller
					control={control}
					name='priority'
					render={({ field: { value, onChange } }) => (
						<Select
							data={['high', 'medium', 'low'].map(item => ({
								value: item,
								label: item
							}))}
							onChange={onChange}
							value={value || ''}
						/>
					)}
				/>
			</div>
            <div className={styles.cardActions}>
            <button
					onClick={() =>
						item.id ? deleteTask(item.id) : setItems(prev => prev?.slice(0, -1))
					}
					className={clsx(styles.deleteBtn)}
				>
					{isDeletePending ? <Loader size={15} /> : <Trash size={15} />}
				</button>    
            </div>
		</div>
	)
}

export default KanbanCard
