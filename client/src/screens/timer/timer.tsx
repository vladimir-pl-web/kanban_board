"use client"
import { Heading } from "@/components/ui/heading/heading"
import { FC } from "react"
import styles from './timer.module.scss'
import Rounds from "@/components/timer/rounds/rounds"
import { useTimer } from "@/hooks/timer/useTimer"
import { useTodaySession } from "@/hooks/timer/useTodaySession"
import { useTimerActions } from "@/hooks/timer/useTimerActions"
import { formatTime } from "@/utils/formatTime"
import Loader from "@/components/ui/loader/loader"
import { useCreateSession } from "@/hooks/timer/useCreateSession"
import { useDeleteSession } from "@/hooks/timer/useDeleteSession"
import { Pause, Play, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button/button"


const Timer:FC = ()=>{
	const timerState = useTimer()
	const { isLoading, sessionResponse, workInterval } = useTodaySession(timerState)
    const rounds = sessionResponse?.data.rounds
	const actions = useTimerActions({ ...timerState, rounds })

    const { createSession, isCreatePending } = useCreateSession()
	const { deleteSession, isDeletePending } = useDeleteSession(() =>
		timerState.setSecondsLeft(workInterval * 60)
	)

    return <div className={styles.wrapper}>
        <Heading title='Timer' />

        <div className={styles.timer}>
			{!isLoading && (
				<div className={styles.format}>
					{formatTime(timerState.secondsLeft)}
				</div>
			)}
			{isLoading ? (
				<Loader />
			) : sessionResponse?.data ? (
				<>
					<Rounds
						rounds={rounds}
						nextRoundHandler={actions.nextRoundHandler}
						prevRoundHandler={actions.prevRoundHandler}
						activeRound={timerState.activeRound}
						sliderPercents={timerState.sliderPercents}
					/>
					<button
						className={styles.btnPlay}
						onClick={
							timerState.isRunning ? actions.pauseHandler : actions.playHandler
						}
						disabled={actions.isUpdateRoundPending}
					>
						{timerState.isRunning ? <Pause size={30} /> : <Play size={30} />}
					</button>
					<button
						onClick={() => {
							timerState.setIsRunning(false)
							deleteSession(sessionResponse.data.id)
						}}
						className={styles.btnRefresh}
						disabled={isDeletePending}
					>
						<RefreshCcw size={19} />
					</button>
				</>
			) : (
				<Button
					onClick={() => createSession()}
					className='mt-1'
					disabled={isCreatePending}
				>
					Create session
				</Button>
			)}
		</div>
    </div>
}

export default Timer