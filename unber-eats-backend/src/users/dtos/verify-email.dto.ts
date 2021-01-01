import { InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutPut } from "src/common/dtos/ouput.dto";
import { Verification } from "../entities/verification.entity";

@ObjectType()
export class VerifyEmailOutput extends CoreOutPut{}

@InputType()
export class VerifyEmailInput extends PickType(Verification,['code']){}