import clsx from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { FC, useCallback, useMemo, useState, useEffect } from 'react'

import styles from './rounds.module.scss'
import { IPomodoroRoundResponse } from '@/types/timer.types'

interface IRounds {
	rounds: IPomodoroRoundResponse[] | undefined
	nextRoundHandler: () => void
	prevRoundHandler: () => void
	sliderPercents: number
	activeRound: IPomodoroRoundResponse | undefined
}
const Rounds: FC<IRounds> = ({
	rounds,
	nextRoundHandler,
	prevRoundHandler,
	activeRound,
	sliderPercents
}) => {


	const isPrevRound = useMemo(() => {
		return rounds ? rounds.some(round => round.isCompleted) : false
	}, [rounds])

	const isNextRound = useMemo(() => {
		return rounds ? !rounds[rounds.length - 1]?.isCompleted : false
	}, [rounds])

	const roundsData = useMemo(() => {
		return (
			rounds &&
			rounds.map((round, index) => {
				const roundActive = round.id === activeRound?.id && !round.isCompleted
				return 			(
					<div
					key={index}
					className={clsx(styles.round)}
					>
						<div
						className={clsx(styles.slide, {
							[styles.completed]: round.isCompleted,
							[styles.active]: roundActive,
							[styles.active20]: roundActive && sliderPercents >= 20,
							[styles.active40]: roundActive && sliderPercents >= 40,
							[styles.active60]: roundActive && sliderPercents >= 60,
							[styles.active80]: roundActive && sliderPercents >= 80
	
						} )}
						>
	
						</div>
					</div>
				)
			} 
			
)
		)
	}, [activeRound?.id, rounds, sliderPercents])

	const onPrevRound = useCallback(() => {
		prevRoundHandler()
	}, [prevRoundHandler])

	const onNextRound = useCallback(() => {
		nextRoundHandler()
	}, [nextRoundHandler])

	return (
		<div className={clsx(styles.container)}>
			<button
				className={styles.button}
				disabled={!isPrevRound}
				onClick={() => (isPrevRound ? onPrevRound() : false)}
			>
				<ChevronLeft size={23} />
			</button>
			{roundsData}
			<button
				className={styles.button}
				disabled={!isNextRound}
				onClick={() => (isNextRound ? onNextRound() : false)}
			>
				<ChevronRight size={23} />
			</button>
		</div>
	)
}

export default Rounds
