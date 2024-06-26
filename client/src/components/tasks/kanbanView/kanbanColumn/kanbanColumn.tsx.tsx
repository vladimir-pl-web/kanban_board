import { Draggable, Droppable } from '@hello-pangea/dnd'
import { Dispatch, FC, SetStateAction } from 'react'

import styles from './kanbanColumns.module.scss'
import { ITaskResponse } from '@/types/task.types'
import { filterTasks } from '@/utils/filterTasks'
import { FILTERS } from '../../columns.data'
import AddCardInput from '../addCardInput/addCardInput'
import KanbanCard from '../kanbanCard/kanbanCard'

interface IKanbanColumn {
	value: string
	label: string
	items: ITaskResponse[] | undefined
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}
const ListRowParent: FC<IKanbanColumn> = ({
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
					<div className={styles.column}>
						<div className={styles.columnHeading}>{label}</div>

					{///filtered draggable elements accordance data and isCompleted state
					filterTasks(items, value)?.map((el, i) => {
						return (
							<Draggable key={el.id} draggableId={el.id} index={i}>
								{provided => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
									>
											<KanbanCard
											key={el.id}
											item={el}
											setItems={setItems}
										/>
									</div>
								)}
							</Draggable>
						)
					})}
					{provided.placeholder}

					{value !== 'completed' && !items?.some(item => !item.id) && (
						<AddCardInput
							setItems={setItems}
							filterDate={FILTERS[value] ? FILTERS[value].format() : undefined}
						/>
					)}
					</div>
				</div>
			)}
		</Droppable>
	)
}

export default ListRowParent
