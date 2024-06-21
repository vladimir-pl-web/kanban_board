import { useQuery } from '@tanstack/react-query'

import { User } from '@/services/user.service'

export const useProfile = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => User.getProfile()
	})

	return { data, isLoading }
}
