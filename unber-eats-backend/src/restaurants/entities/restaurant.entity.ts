import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType() // for graphql
@Entity() // for typeorm
export class Restaurant {
    @Field((type) => Number)
    @PrimaryGeneratedColumn()
    id:number

    // restaurant가 어떻게 생겼는지 desc하자
    // Query의 Schema와 같은 것
    @Field((type) => String) //graphql
    @Column() //TypeORM
    @IsString() // Validator
    name: string;

    @Field((type) => Boolean, {defaultValue: true})
    @Column({default:true})
    @IsOptional()
    @IsBoolean()
    isVegan: boolean

    @Field((type) => String)
    @Column()
    @IsString()
    address: string

    @Field((type) => String)
    @Column()
    @IsString()
    ownerName: string

    @Field((type) => String)
    @Column()
    @IsString()
    categoryName: string;
}
