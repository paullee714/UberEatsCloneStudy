import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { MutationOutPut } from "src/common/dtos/ouput.dto";
import { User } from "../entities/user.entity";


@InputType()
export class CreateAccountInput extends PickType(User,["email","password","role"]){}

@ObjectType()
export class CreateAccountOutPut extends MutationOutPut{}