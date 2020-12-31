import { InputType, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { CoreOutPut } from "src/common/dtos/ouput.dto";
import { User } from "../entities/user.entity";

@ObjectType()
export class EditProfileOuput extends CoreOutPut{}

@InputType()
export class EditProfileInput extends PartialType(
    PickType(User,["email","password"]),
){}