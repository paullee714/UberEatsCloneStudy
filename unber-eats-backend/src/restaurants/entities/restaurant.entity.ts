import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Restaurant{

    // restaurant가 어떻게 생겼는지 desc하자
    // Query의 Schema와 같은 것 
    @Field(type => String)
    name: string;
    
    @Field(type => Boolean, {nullable:true})
    isGood?: boolean

}