import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAccountInput } from "./dtos/create-account.dto";
import { LoginInput } from "./dtos/login.dto";
import { User } from "./entities/user.entity";
import * as jwt from "jsonwebtoken"
import { ConfigService } from "@nestjs/config";
import { JwtService } from "src/jwt/jwt.service";
import { EditProfileInput, EditProfileOuput } from "./dtos/edit-profile.dto";
import { Verification } from "./entities/verification.entity";
import { VerifyEmailOutput } from "./dtos/verify-email.dto";
import { UserProfileOutput } from "./dtos/user-profile.dto";
import { MailService } from "src/mail/mail.service";


@Injectable()
export class UsersSerivce{
    constructor(
        @InjectRepository(User) private readonly users: Repository<User>,
        @InjectRepository(Verification) 
        private readonly verifications: Repository<Verification>, //verification
        private readonly jwtService: JwtService,
        private readonly mailService: MailService,
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
            const user = await this.users.save(this.users.create({email,password,role}))
            //start verification
            const verification =await this.verifications.save(this.verifications.create({
                user
            }));

            this.mailService.sendVerificatioNEmail(user.email,verification.code)

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
            // select user's password -> entity에 select false라고 했기때문
            const user = await this.users.findOne({email},{select:['id','password']});
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

    async findById(id:number): Promise<UserProfileOutput> {
        try{
            const user = await this.users.findOne({id});
            if(user){
                return{
                    ok:true,
                    user:user
                };
            }
        }catch(error){
            return{ok:false,error:"User Not Found"}
        }
    }


    async editProfile(userId:number, {email,password}:EditProfileInput):Promise<EditProfileOuput>{
        try{
            const user = await this.users.findOne(userId);
            if(email){
                user.email = email
                user.verified = false;
                const verification = await this.verifications.save(this.verifications.create({user}))
                //verification mail send
                this.mailService.sendVerificatioNEmail(user.email,verification.code)
            }
            if(password){
                user.password = password
            }
                    
            await this.users.save(user);
            return{
                ok:true
            }
        }catch(error){
            return {ok:false, error:'Could not update profile.'}
        }


        
    }

    async verifyEmail(code:string):Promise<VerifyEmailOutput>{
        try{
            const verification = await this.verifications.findOne({code},{relations:['user']})
            if(verification){
                verification.user.verified = true
                await this.users.save(verification.user)
                await this.verifications.delete(verification.id) // delete thie verification code
                return {ok:true};
            }
            return {ok:false, error:'Verification not found.'}
        }catch(error){
            return {ok:false, error}
        }
    }

}