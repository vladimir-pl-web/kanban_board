import { FILTERS } from "@/components/tasks/columns.data"
import { useUpdateTask } from "./useUpdateTasks"
import { DropResult } from '@hello-pangea/dnd'

export const useDNDTask = ()=>{

    const{mutate} = useUpdateTask()
    const onDragEnd = (result:DropResult)=>{
        if(!result.destination) return

        const destinationColumnID = result.destination.droppableId
        if(destinationColumnID === result.source.droppableId) return
        
        if(destinationColumnID === 'completed'){
            mutate({
                id: result.draggableId,
                data: {isCompleted: true}
            })
            return
        }

        const newCreatedAt = FILTERS[destinationColumnID].format()
        mutate({
            id: result.draggableId,
            data: {
                createdAt: newCreatedAt,
                isCompleted: false
            }
        })


    }

    return{onDragEnd}
}
