import { ArgsType, Field, InputType } from "@nestjs/graphql";

@ArgsType() //ArgsType은 각 Field를 각 Argument로 분리 ...
export class CreateRestaurantDto{
    
    @Field(type => String)
    name:string
    
    @Field(type => Boolean)
    isVegan:boolean
    
    @Field(type => String)
    address:string
    
    @Field(type => String)
    ownerName:string
}