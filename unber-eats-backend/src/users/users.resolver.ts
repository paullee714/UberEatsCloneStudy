import { Query, Resolver } from "@nestjs/graphql";
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

}