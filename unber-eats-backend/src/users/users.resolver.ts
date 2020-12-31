import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { AuthGuard } from "src/auth/auth.guard";
import { CreateAccountInput, CreateAccountOutPut } from "./dtos/create-account.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
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
            return this.userService.createAccount(createAccountInput);
        }catch(error){
            return{
               error,
               ok:false
            }

        }
    }

    @Mutation(returns => LoginOutput)
    async login(@Args('input') loginInput: LoginInput) :Promise<LoginOutput>{
        try{
            return this.userService.login(loginInput)
        }catch(error){
            return{
                ok:false,
                error,
            }
        }
    }

    // @Query(returns => User)
    // me(@Context() context){
    //     if(!context.user){
    //         return;
    //     }else{
    //         return context.user
    //     }
    // }
    @Query(returns => User)
    // @UseGuards(AuthGuard)
    me(@AuthUser() authUser :User){
        return authUser
    }

}