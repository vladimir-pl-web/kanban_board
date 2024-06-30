import { useEffect, useState } from 'react'

import { useLoadSettings } from './useLoadSettings'
import { IPomodoroRoundResponse, ITimerState } from '@/types/timer.types'

export function useTimer(): ITimerState {
	const { breakInterval, workInterval } = useLoadSettings()

	const [isRunning, setIsRunning] = useState(false)
	const [isBreakTime, setIsBreakTime] = useState(false)

	const [secondsLeft, setSecondsLeft] = useState(workInterval * 60)
	const [activeRound, setActiveRound] = useState<IPomodoroRoundResponse>()
	const[sliderPercents, setSliderPercents] = useState<number>(0)

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null

		if (isRunning) {
			interval = setInterval(() => {
				setSecondsLeft(secondsLeft => secondsLeft - 1)
			}, 1000)
		} else if (!isRunning && secondsLeft !== 0 && interval) {
			clearInterval(interval)
		}

		return () => {
			if (interval) clearInterval(interval)
		}
	}, [isRunning, secondsLeft, workInterval, activeRound])

	useEffect(() => {
		if (secondsLeft > 0) return
		setIsBreakTime(!isBreakTime)
		setSecondsLeft((isBreakTime ? workInterval : breakInterval) * 60)
	}, [secondsLeft, isBreakTime, workInterval, breakInterval])

	useEffect(()=>{
		if(secondsLeft > 0){
			const workSeconds = workInterval * 60 
			const dTime = workSeconds - secondsLeft
			const percents = (dTime /workSeconds) * 100
			setSliderPercents(percents)

		}else{
			return
		}
	},[secondsLeft, workInterval])


	return {
		activeRound,
		secondsLeft,
		setActiveRound,
		setIsRunning,
		setSecondsLeft,
		isRunning,
		sliderPercents
	}
}
