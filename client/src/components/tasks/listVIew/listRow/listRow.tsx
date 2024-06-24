import clsx from 'clsx'
import { GripVertical, Loader, Trash } from 'lucide-react'
import type { Dispatch, FC, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'

import styles from './listRow.module.scss'
import Checkbox from '@/components/ui/checkbox/checkbox'
import { DatePicker } from '@/components/ui/task/dayPicker/datePicker'
import Select from '@/components/ui/task/select/select'
import { useTaskDebounce } from '@/hooks/useTaskDebounce'
import type { ITaskResponse, TypeTaskFormState } from '@/types/task.types'
import { useDeleteTask } from '@/hooks/useDeleteTask'
import { TransparentField } from '@/components/ui/fields/transparentField'



interface IListRow {
	item: ITaskResponse
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

const ListRow: FC<IListRow> = ({ item, setItems }) => {
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
			className={clsx(styles.listRow, {
				[styles.completed]: watch('isCompleted')
			})}
		>
			<div>
				<span>
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
				</span>
			</div>
			<div>
				<Controller
					control={control}
					name='createdAt'
					render={({ field: { value, onChange } }) => (
						<DatePicker onChange={onChange} value={value || ''} />
					)}
				/>
			</div>
			<div className='capitalize'>
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
            <div>
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

export default ListRow
