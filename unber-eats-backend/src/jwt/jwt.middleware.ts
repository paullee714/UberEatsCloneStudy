import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request,Response } from "express";
import { UsersSerivce } from "src/users/user.service";
import { JwtService } from "./jwt.service";

@Injectable()
export class JwtMiddleWare implements NestMiddleware{
    constructor(private readonly jwtService: JwtService, private readonly userService:UsersSerivce){}
    async use(req:Request, res: Response, next:NextFunction){
        // console.log(req.headers);
        if("x-jwt" in req.headers){
            const token = req.headers['x-jwt']
            const decoded = this.jwtService.verify(token.toString())
            if(typeof decoded === "object" && decoded.hasOwnProperty("id")){
                // console.log(decoded['id'])
                try{
                    const user = await this.userService.findById(decoded['id'])
                    // console.log(user)
                    req['user'] = user;
                }catch(e){

                }
            }
        }
        next();
    }
}

// export function jwtMiddleware(req:Request, res:Response, next:NextFunction){
//     console.log(req.headers);
//     next()
// }