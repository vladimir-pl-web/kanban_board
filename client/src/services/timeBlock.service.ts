import { axiosAuth } from "@/api/interceptors"
import { ITimeBlockResponse, TypeTimeBlockFormState } from "@/types/time-block.types"

class TimeBlockService {
    private URL = 'user/time-block'

    async getTimeBlocks(){
        const res = await axiosAuth.get<ITimeBlockResponse>(
            `${this.URL}`
        )
        return res
    }

    async createTimeBlocks(data: TypeTimeBlockFormState){
        const res = await axiosAuth.post(
            this.URL, data
        )
        return res
    }

    async updateOrder(ids: string[]){
        const res = await axiosAuth.put(
            `${this.URL}/update-order`,{ids}
        )
        return res
    }

    async updateTimeBlocks(id:string, data: TypeTimeBlockFormState){
        const res = await axiosAuth.put(
            `${this.URL}/${id}`,data
        )
        return res
    }

    async deleteTimeBlocks(id:string){
        const res = await axiosAuth.delete(
            `${this.URL}/${id}`
        )
        return res
    }

}

export const TimeBlock = new TimeBlockService()