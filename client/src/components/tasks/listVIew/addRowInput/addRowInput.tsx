import { ITaskResponse } from "@/types/task.types";
import clsx from "clsx";
import { Dispatch, FC, SetStateAction } from "react";
import styles from './addRowInput.module.scss'

interface IListAddRowInput {
	filterDate?: string
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

const AddRowInput:FC<IListAddRowInput> = ({filterDate, setItems})=>{
    const addRow = () => {
		setItems(prev => {
			if (!prev) return

			return [
				...prev,
				{
					id: '',
					name: '',
					isCompleted: false,
					createdAt: filterDate
				}
			]
		})
	}
    return 	<div className={clsx(styles.addRow)}>
    <button
        onClick={addRow}
        className='italic text-white text-sm'
    >
        Add task...
    </button>
</div>
}

export default AddRowInput