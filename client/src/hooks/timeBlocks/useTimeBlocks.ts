import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import type { ITimeBlockResponse } from '@/types/time-block.types'
import { TimeBlock } from '@/services/timeBlock.service'

export const useTimeBlocks = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['time-blocks'],
		queryFn: () => TimeBlock.getTimeBlocks()
	})

	const [items, setItems] = useState<ITimeBlockResponse[] | undefined>(
		data?.data
	)

	useEffect(() => {
		setItems(data?.data)
	}, [data?.data])

	return { items, setItems, isLoading }
}
