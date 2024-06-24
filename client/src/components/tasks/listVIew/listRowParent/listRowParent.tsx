import { Draggable, Droppable } from '@hello-pangea/dnd'
import clsx from 'clsx'
import { Dispatch, FC, SetStateAction } from 'react'

import ListRow from '../listRow/listRow'

import styles from './listRowParent.module.scss'
import { ITaskResponse } from '@/types/task.types'
import { filterTasks } from '@/utils/filterTasks'
import { FILTERS } from '../../columns.data'
import AddRowInput from '../addRowInput/addRowInput'

interface IListRowParent {
	value: string
	label: string
	items: ITaskResponse[] | undefined
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}
const ListRowParent: FC<IListRowParent> = ({
	value,
	label,
	items,
	setItems
}) => {
	return (
		<Droppable // the place where to drop Item
			droppableId={value}
		>
			{provided => (
				<div ref={provided.innerRef} {...provided.droppableProps}>
					<div className={clsx(styles.heading)}>
						<div className='w-full'>{label}</div>
					</div>
					{///filtered draggable elements accordance data and isCompleted state
					filterTasks(items, value)?.map((el, i) => {
						return (
							<Draggable key={el.id} draggableId={el.id} index={i}>
								{provided => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										className='my-4'
									>
										<ListRow key={el.id} item={el} setItems={setItems} />
									</div>
								)}
							</Draggable>
						)
					})}
					{provided.placeholder}

					{value !== 'completed' && !items?.some(item => !item.id) && (
						<AddRowInput
							setItems={setItems}
							filterDate={FILTERS[value] ? FILTERS[value].format() : undefined}
						/>
					)}
				</div>
			)}
		</Droppable>
	)
}

export default ListRowParent
