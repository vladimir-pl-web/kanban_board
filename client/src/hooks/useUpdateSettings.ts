import { User } from "@/services/user.service"
import { TypeUserForm } from "@/types/auth.types"
import { useMutation, useQueryClient} from "@tanstack/react-query"
import { toast } from "sonner"

export const useUpdateSettings = ()=>{
    
    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
		mutationKey: ['update profile'],
		mutationFn: (dto: TypeUserForm) => User.update(dto),
        onSuccess(){
            toast.success("Successfully updated profile!")
            queryClient.invalidateQueries({queryKey:['profile']})

        }
	})
    return{mutate, isPending}
}