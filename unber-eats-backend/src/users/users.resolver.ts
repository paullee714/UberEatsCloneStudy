import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateAccountInput, CreateAccountOutPut } from "./dtos/create-account.dto";
import { User } from "./entities/user.entity";
import { UsersSerivce } from "./user.service";



@Resolver(of => User)
export class UsersResolver{

    constructor(
        private readonly userService: UsersSerivce
    ){}

    @Query(returns => Boolean)
    hi(){
        return true;
    }

    @Mutation(returns => CreateAccountOutPut)
    async createAccount(@Args("input") createAccountInput: CreateAccountInput): Promise<CreateAccountOutPut>{
        try{
            const error = await this.userService.createAccount(createAccountInput);
            if(error){
                return{
                    ok: false,
                    error,
                };
            }
            return{
                ok:true,
            }
        }catch(error){
            return{
               error,
               ok:false
            }

        }
    }

}