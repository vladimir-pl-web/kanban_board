import type { IBase } from './root.types'

export enum EnumTaskPriority {
	low = 'low',
	medium = 'medium',
	high = 'high'
}

export interface ITaskResponse extends IBase {
	name: string
	priority?: EnumTaskPriority
	isCompleted: boolean
}

export enum IView{
	Kanban = "kanban",
	List = "list"
}

export type TypeTaskFormState = Partial<Omit<ITaskResponse, 'id' | 'updatedAt'>>
