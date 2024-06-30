import { Timer } from "@/services/timer.service"
import { IPomodoroRoundResponse, ITimerState } from "@/types/timer.types"
import { useQuery } from "@tanstack/react-query"
import { useLoadSettings } from "./useLoadSettings"
import { useEffect } from "react"

export const useTodaySession = ({
	setActiveRound,
	setSecondsLeft
}: ITimerState)=>{
    const { workInterval } = useLoadSettings()
    const{
        data: sessionResponse,
        isLoading,
        refetch,
        isSuccess
    } = useQuery({
        queryKey:['session'],
        queryFn:()=>Timer.getTodaySession()
    })

	const rounds:IPomodoroRoundResponse[] | undefined = sessionResponse?.data.rounds


	useEffect(() => {
		if (isSuccess && rounds) {
			const activeRound = rounds.find(round => !round.isCompleted)
			setActiveRound(activeRound)

			if (activeRound && activeRound?.totalSeconds !== 0) {
				setSecondsLeft(activeRound.totalSeconds)
			}
		}
	}, [isSuccess, rounds, setActiveRound, setSecondsLeft])

    return{sessionResponse, isLoading, workInterval}
}