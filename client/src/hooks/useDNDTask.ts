import { FILTERS } from "@/components/tasks/columns.data"
import { useUpdateTask } from "./useUpdateTasks"
import { DropResult } from '@hello-pangea/dnd'

export const useDNDTask = ()=>{

    const {updateTask}  = useUpdateTask()

    const onDragEnd = (result:DropResult)=>{
        if(!result.destination) return

        const destinationColumnID = result.destination.droppableId
        if(destinationColumnID === result.source.droppableId) return
        
        if(destinationColumnID === 'completed'){
            updateTask({
                id: result.draggableId,
                data: {isCompleted: true}
            })
            return
        }

        const newCreatedAt = FILTERS[destinationColumnID].format()
        updateTask({
            id: result.draggableId,
            data: {
                createdAt: newCreatedAt,
                isCompleted: false,
            }
        })


    }

    return{onDragEnd}
}
