
import { useMutation, useQueryClient} from "@tanstack/react-query"
import { toast } from "sonner"
import { Timer } from "../../services/timer.service"
import { TypePomodoroRoundState } from "@/types/timer.types"



export const useUpdateRound = ()=>{
    const queryClient = useQueryClient()

    const { mutate: updateRound, isPending: isUpdateRoundPending } = useMutation({
		mutationKey: ['update round'],
		mutationFn: ({id, dto}:{id:string, dto: TypePomodoroRoundState }) => Timer.updateRound(id, dto),
        onSuccess(){
            toast.success("Round successfully updated!")
            queryClient.invalidateQueries({queryKey:['session']})

        }
	})
    return{updateRound, isUpdateRoundPending}
}