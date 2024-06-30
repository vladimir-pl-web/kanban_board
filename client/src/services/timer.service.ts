import { axiosAuth } from '@/api/interceptors'
import {
	IPomodoroSessionResponse,
	TypePomodoroSessionState
} from '@/types/timer.types'

class TimerService {
	private URL = '/user/timer'

	async getTodaySession() {
		const res = await axiosAuth.get<IPomodoroSessionResponse>(`${this.URL}/today`)
		return res
	}

	async createSession() {
		const res = await axiosAuth.post<IPomodoroSessionResponse>(`${this.URL}/create`)
		return res
	}

	async updateSession(id: string, data: TypePomodoroSessionState) {
		const res = await axiosAuth.put(`${this.URL}/${id}`, data)
		return res
	}

	async updateRound(id: string, data: TypePomodoroSessionState) {
		const res = await axiosAuth.put(`${this.URL}/round/${id}`, data)
		return res
	}

	async deleteSession(id: string) {
		const res = await axiosAuth.delete(`${this.URL}/${id}`)
		return res
	}
}

export const Timer = new TimerService()
