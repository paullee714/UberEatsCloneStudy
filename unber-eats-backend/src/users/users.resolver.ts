import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { AuthGuard } from "src/auth/auth.guard";
import { CreateAccountInput, CreateAccountOutPut } from "./dtos/create-account.dto";
import { EditProfileInput, EditProfileOuput } from "./dtos/edit-profile.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { UserProfileInput, UserProfileOutput } from "./dtos/user-profile.dto";
import { VerifyEmailInput, VerifyEmailOutput } from "./dtos/verify-email.dto";
import { User } from "./entities/user.entity";
import { UsersSerivce } from "./user.service";



@Resolver(of => User)
export class UsersResolver{
    constructor(private readonly userService: UsersSerivce){}

    @Query(returns => Boolean)
    hi(){
        return true;
    }

    @Mutation(returns => CreateAccountOutPut)
    async createAccount(@Args("input") createAccountInput: CreateAccountInput): Promise<CreateAccountOutPut>{
        return this.userService.createAccount(createAccountInput);
    }

    @Mutation(returns => LoginOutput)
    async login(@Args('input') loginInput: LoginInput) :Promise<LoginOutput>{
        return this.userService.login(loginInput)
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
    @UseGuards(AuthGuard)
    me(@AuthUser() authUser :User){
        return authUser
    }

    @Query(returns => UserProfileOutput)
    @UseGuards(AuthGuard)
    async userProfile(@Args() userProfileInput: UserProfileInput): Promise<UserProfileOutput>{
        return this.userService.findById(userProfileInput.userId)
    }


    @UseGuards(AuthGuard)
    @Mutation(returns => EditProfileOuput)
    async editProfile(@AuthUser() authUser :User,@Args("input") editProfileInput: EditProfileInput): Promise<EditProfileOuput>{
        return this.userService.editProfile(authUser.id,editProfileInput)
    }

    @Mutation(returns => VerifyEmailOutput)
    verifyEmail(@Args('input') {code}: VerifyEmailInput):Promise<VerifyEmailOutput>{
        return  this.userService.verifyEmail(code)
    }

}