import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutPut } from "src/common/dtos/ouput.dto";
import { User } from "../entities/user.entity";


@ArgsType()
export class UserProfileInput{
    @Field(type=>Number)
    userId: number

}

@ObjectType()
export class UserProfileOutput extends CoreOutPut{
    @Field(type => User, {nullable:true})
    user?: User;
}