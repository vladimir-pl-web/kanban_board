import clsx from 'clsx'
import { X } from 'lucide-react'
import { FC, useCallback, MouseEvent, MouseEventHandler, useMemo } from 'react'

import { Badge } from '../../badge/badge'

import styles from './select.module.scss'
import { useOutside } from '@/hooks/useOutside'

interface ISelect {
	data: IOption[]
	onChange: (value: string) => void
	value: string
	isColorSelect?: boolean
}
export interface IOption {
	label: string
	value: string
}
const Select: FC<ISelect> = ({ data, onChange, value, isColorSelect }) => {
	const { ref, isShow, setIsShow } = useOutside(false)
	const getValue = () => data.find(i => i.value === value)?.value

	const onSetShow = useCallback(
		(e: MouseEvent<HTMLButtonElement>) => {
			e.preventDefault()
			setIsShow(prev => !prev)
		},
		[setIsShow]
	)

	const onChangeClear = useCallback(
		(e: MouseEvent<HTMLButtonElement>) => {
			e.preventDefault()
			onChange('')
		},
		[onChange]
	)

	const onChangeHandler = useCallback(
		(e: MouseEvent<HTMLButtonElement>, val: string) => {
			e.preventDefault()
			onChange(val)
			setIsShow(false)
		},
		[onChange, setIsShow]
	)

	const selectData = useMemo(() => {
		return (
			isShow && (
				<div
					className={clsx(styles.data)}
					style={{
						top: 'calc(100% + .5rem'
					}}
				>
					{data.map(el => {
						return (
							<button
								key={el.value}
								onClick={e => onChangeHandler(e, el.value)}
								className={clsx(styles.selectBtn)}
								style={isColorSelect ? { backgroundColor: el.value } : {}}
							>
								<Badge variant={el.value}>{el.label}</Badge>
							</button>
						)
					})}
				</div>
			)
		)
	}, [data, isColorSelect, isShow, onChangeHandler])

	return (
		<div ref={ref} className={clsx(styles.select)}>
			<button onClick={e => onSetShow(e)}>
				{getValue() ? (
					<Badge
						variant={value}
						className='capitalize'
						style={isColorSelect ? { backgroundColor: value } : {}}
					>
						{getValue()}
					</Badge>
				) : (
					<Badge>Click for select</Badge>
				)}
			</button>
			{value && (
				<button className={clsx(styles.btn)} onClick={e => onChangeClear(e)}>
					<X size={14} />
				</button>
			)}
			{selectData}
		</div>
	)
}

export default Select
