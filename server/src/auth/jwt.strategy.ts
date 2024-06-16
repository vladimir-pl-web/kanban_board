import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt, Strategy}from 'passport-jwt'
import { ConfigService } from '@nestjs/config';
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
constructor(
    private configService: ConfigService,
    private userService: UserService
){
   super({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    ignoreExpiration: true,
    secretOrKey: configService.get('SECRET')
   }) 
    }

async validate(id:string){
    return this.userService.getById(id)
    }
}