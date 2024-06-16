import { IsNumber, IsOptional, Max, Min } from "class-validator";

export class PomodoroSettingDto{
    @IsOptional()
    @IsNumber()
    @Min(1)
    workInterval?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    breakInterval?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(10)
    intervalCount?: number;

}