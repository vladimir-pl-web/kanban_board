import { ITaskResponse } from "@/types/task.types";
import { Dispatch, FC, SetStateAction } from "react";

interface IListAddRowInput {
	filterDate?: string
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

const AddCardInput:FC<IListAddRowInput> = ({filterDate, setItems})=>{
    const addCard = () => {
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
    return 	<div className='mt-5'>
    <button
        onClick={addCard}
        className='italic opacity-40 text-sm'
    >
        Add task...
    </button>
</div>
}

export default AddCardInput