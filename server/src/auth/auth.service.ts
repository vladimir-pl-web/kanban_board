import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/dto';
import { verify } from 'argon2';
import { Response} from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    EXPIRE_DAY_REFRESH_TOKEN = 1;
    REFRESH_TOKEN_NAME = 'refreshToken'

    constructor(
        private jwt:JwtService,
        private userService: UserService,
        private configService: ConfigService
    ){}
    async login(dto:AuthDto){
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {password, ...user} = await this.validateUser(dto)

        const tokens =  this.issueTokens(user.id)

        return{
            refreshToken: tokens.refreshToken,
            accessToken: tokens.accessToken,
            user
          }
    }

    async register(dto:AuthDto){
        const oldUser = await this.userService.getByEmail(dto.email)
        if(oldUser) throw new BadRequestException("This email already in use")

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {password, ...user} = await this.userService.create(dto)
    
        const tokens =  this.issueTokens(user.id)

        return{
            ...tokens,
            user
          }
    }

    private issueTokens(userId:string){
        const data = {id:userId}

        const accessToken = this.jwt.sign(data,{
            expiresIn: '1h'
        })

        
        const refreshToken = this.jwt.sign(data,{
            expiresIn: '7d'
        })

        return{
            accessToken,
            refreshToken
        }
    }

    private async validateUser(dto:AuthDto){
        const user = await this.userService.getByEmail(dto.email)
        if(!user) throw new NotFoundException('User not found')

        const isValid = await verify(user.password, dto.password)
        if(!isValid) throw new UnauthorizedException("Invalid password")

        return user
    }

    addRefreshTokenToResponse(res: Response, refreshToken:string){
        const expiresIn = new Date()
        expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)


        res.cookie(this.REFRESH_TOKEN_NAME, refreshToken,{
            httpOnly: true,
            domain: this.configService.get("DOMAIN"),
            expires: expiresIn,
            secure: true,
            sameSite: 'lax'
        })
    }

    removeRefreshToken(res: Response){
        const expiresIn = new Date(0)
        expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)

        res.cookie(this.REFRESH_TOKEN_NAME, '',{
            httpOnly: true,
            domain: this.configService.get("DOMAIN"),
            expires: expiresIn,
            secure: true,
            //lax if prod
            sameSite: 'lax'
        })
    }

    async getNewTokens(refreshToken:string){
        const result = await this.jwt.verifyAsync(refreshToken)
      
        if(!result) throw new UnauthorizedException("Token not valid")
        
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const {password, ...user} = await this.userService.getById(result.id)
          const tokens = this.issueTokens(user.id)
    
        return {user, ...tokens}
      }
}
