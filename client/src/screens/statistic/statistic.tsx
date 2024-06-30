'use client'

import clsx from 'clsx'
import { FC, useMemo } from 'react'

import styles from './statistic.module.scss'
import { Heading } from '@/components/ui/heading/heading'
import Loader from '@/components/ui/loader/loader'
import { useProfile } from '@/hooks/profile/useProfile'


const Statistic: FC = () => {
	const { data, isLoading } = useProfile()

	const statisticData = useMemo(() => {
		return data?.statistic?.length ? (
			data.statistic.map(el => {
				return (
					<div key={el.label} className={clsx(styles.statItem)}>
						<div className={clsx(styles.label)}>{el.label}</div>
						<div className={clsx(styles.value)}>{el.value}</div>
					</div>
				)
			})
		) : (
			<div>Statistic data not loaded</div>
		)
	}, [data])

	return (
		<div className={clsx(styles.wrapper)}>
			<Heading title='Statistic' />
			{isLoading ? (
				<Loader />
			) : (
				<div className={clsx(styles.statystic)}>{statisticData}</div>
			)}
		</div>
	)
}

export default Statistic
