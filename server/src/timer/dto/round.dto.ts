import { IsBoolean, IsNumber, IsOptional } from "class-validator"

export class RoundDto{
    @IsNumber()
    totalSeconds: number

    @IsOptional()
    @IsBoolean()
    isCompleted?: boolean
}