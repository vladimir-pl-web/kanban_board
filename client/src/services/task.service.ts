import { axiosAuth } from '@/api/interceptors'
import { ITaskResponse, TypeTaskFormState } from '@/types/task.types'

class TaskService {
	private URL = 'user/tasks'

	async getTasks() {
		const res = await axiosAuth.get<ITaskResponse[]>(this.URL)
		return res
	}

	async createTask(data: TypeTaskFormState) {
		const res = await axiosAuth.post(`${this.URL}/create`, data)
		return res
	}

	async updateTask(id: string, data: TypeTaskFormState) {
		const res = await axiosAuth.put(`${this.URL}/${id}`, data)
		return res
	}

	async deleteTask(id: string) {
		const res = await axiosAuth.delete(`${this.URL}/${id}`)
		return res
	}
}

export const Task = new TaskService()
