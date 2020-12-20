import { ArgsType, Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsString, Length } from "class-validator";


@ArgsType() //ArgsType은 각 Field를 각 Argument로 분리 ...
export class CreateRestaurantDto{
    
    @Field(type => String)
    @IsString() //class validator
    @Length(2,15)
    name:string
    
    @Field(type => Boolean)
    @IsBoolean() //class validator 
    isVegan:boolean
    
    @Field(type => String)
    @IsString() //class validator

    address:string
    
    @Field(type => String)
    @IsString() //class validator
    ownerName:string
}