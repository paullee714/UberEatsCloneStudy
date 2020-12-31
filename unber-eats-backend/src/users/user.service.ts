import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAccountInput } from "./dtos/create-account.dto";
import { LoginInput } from "./dtos/login.dto";
import { User } from "./entities/user.entity";
import * as jwt from "jsonwebtoken"
import { ConfigService } from "@nestjs/config";
import { JwtService } from "src/jwt/jwt.service";
import { EditProfileInput } from "./dtos/edit-profile.dto";


@Injectable()
export class UsersSerivce{
    constructor(
        @InjectRepository(User) private readonly users: Repository<User>,
        private readonly jwtService: JwtService,
    ){}

    async createAccount({email,password,role}:CreateAccountInput): Promise<{ok:boolean,error?:string}>{
        // check User
        // if doesNotExist => Create user & hash the password => return ok
        try{
            const exists = await this.users.findOne({email})
            if(exists){
                // User Exist -> return error 
                return {ok:false,error:"There is a user with that email already"};
            }
            await this.users.save(this.users.create({email,password,role}))
            return {ok:true}
        }catch(e){
            console.log(e)
            return {ok:false,error:"Couldn't create account"}
        }
    }

    async login({email,password}:LoginInput): Promise<{ok:boolean,error?:string,token?:string}>{
        //find user with email
        // check the password
        // make jwt
        try{
            const user = await this.users.findOne({email});
            if(!user){
                return{
                    ok:false,
                    error:"User not Found",
                };
            }
            const passwordCorrect = await user.checkPassword(password);
            if(!passwordCorrect){
                return{
                    ok:false,
                    error:"Wrong Password",
                }
            }
            const token = this.jwtService.sign(user.id)
            return {
                ok:true,
                token:token
            }
        }catch(error){
            console.log(error )
            return{ok:false,error}
        }
    }

    async findById(id:number): Promise<User> {
        return this.users.findOne({id});
    }


    async editProfile(userId:number, {email,password}:EditProfileInput):Promise<User>{
        const user = await this.users.findOne(userId);
        if(email){
            user.email = email
        }
        if(password){
            user.password = password
        }
        return this.users.save(user);
    }

}