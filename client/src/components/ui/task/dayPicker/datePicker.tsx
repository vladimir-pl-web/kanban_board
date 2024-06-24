import cn, { clsx } from 'clsx'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { X } from 'lucide-react'
import { useState } from 'react'
import { DayPicker, type SelectSingleEventHandler } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import styles from './datePicker.module.scss'
import './datePicker.scss'

import { useOutside } from '@/hooks/useOutside'
import { formatCaption } from './datePickerCaption'


dayjs.extend(LocalizedFormat)

interface IDatePicker {
	onChange: (value: string) => void
	value: string
	position?: 'left' | 'right'
}

export function DatePicker({
	onChange,
	value,
	position = 'right'
}: IDatePicker) {
	const [selected, setSelected] = useState<Date>()
	const { isShow, setIsShow, ref } = useOutside(false)

	const handleDaySelect: SelectSingleEventHandler = date => {
		const ISOdate = date?.toISOString()

		setSelected(date)
		if (ISOdate) {
			onChange(ISOdate)
			setIsShow(false)
		} else {
			onChange('')
		}
	}

	return (
		<div
			className='relative w-2/3'
			ref={ref}
		>
			<button onClick={() => setIsShow(!isShow)}>
				{value ? dayjs(value).format('LL') : 'Click for select'}
			</button>
			{value && (
				<button
					className={clsx(styles.btn)}
					onClick={() => onChange('')}
				>
					<X size={14} />
				</button>
			)}
			{isShow && (
				<div
					className={cn(styles.picker,{
						[' -right-4']: position !== 'left'
					}
					)}
					style={{
						top: 'calc(100% + .7rem)'
					}}
				>
					<DayPicker
						fromYear={2023}
						toYear={2054}
						initialFocus={isShow}
						mode='single'
						defaultMonth={selected}
						selected={selected}
						onSelect={handleDaySelect}
						weekStartsOn={1}
						formatters={{ formatCaption }}
					/>
				</div>
			)}
		</div>
	)
}
