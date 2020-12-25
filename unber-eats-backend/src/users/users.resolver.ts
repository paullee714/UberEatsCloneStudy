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
            const {ok,error} = await this.userService.createAccount(createAccountInput);
            return {
                ok,
                error,
            }
        }catch(error){
            return{
               error,
               ok:false
            }

        }
    }

}