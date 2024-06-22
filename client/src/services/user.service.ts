import { axiosAuth } from '@/api/interceptors'
import { IUser, TypeUserForm } from '@/types/auth.types'

export interface IUserResponse {
	user: IUser
	statistic: {
		label: string
		value: string
	}[]
}

class UserService {
	private URL = 'user/profile'

	async getProfile() {
		const res = await axiosAuth.get<IUserResponse>(this.URL)
		return res.data
	}

	async update(data: TypeUserForm) {
		const res = await axiosAuth.put<IUserResponse>(`${this.URL}/update`, data)
		return res.data
	}
}

export const User = new UserService()
