import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAccountInput } from "./dtos/create-account.dto";
import { User } from "./entities/user.entity";


@Injectable()
export class UsersSerivce{
    constructor(
        @InjectRepository(User) private readonly users: Repository<User>
    ){}

    async createAccount({email,password,role}:CreateAccountInput): Promise<string | undefined>{
        // check User
        // if doesNotExist => Create user & hash the password => return ok
        try{
            const exists = await this.users.findOne({email})
            if(exists){
                // User Exist -> return error 
                return "There is a user with that email already";
            }
            await this.users.save(this.users.create({email,password,role}))
        }catch(e){
            console.log(e)
            return "Couldn't create account"
        }
    }
}