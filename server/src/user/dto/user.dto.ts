import { IsEmail, IsOptional, IsString, Matches, MinLength } from "class-validator"
import { PomodoroSettingDto } from "./pomodoro.dto"

export class UserDto extends PomodoroSettingDto {

    @IsString()
    @IsEmail()
    @IsOptional()
    email:string


    @IsString()
    @IsOptional()
    name: string

    @MinLength(6,{
        message: "Password must be at least 6 characters long"
    })
    @IsOptional()
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
         {message: 'Password must have at least 1 uppercase letter, 1 symbol and 1 lowercase letter'}
        )
    @IsString()
    @IsOptional()
    password: string;
}
