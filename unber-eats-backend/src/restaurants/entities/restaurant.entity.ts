import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType() // for graphql
@Entity() // for typeorm
export class Restaurant {
    @Field((type) => Number)
    @PrimaryGeneratedColumn()
    id:number

    // restaurant가 어떻게 생겼는지 desc하자
    // Query의 Schema와 같은 것
    @Field((type) => String)
    @Column()
    name: string;

    @Field((type) => Boolean)
    @Column()
    isVegan: boolean

    @Field((type) => String)
    @Column()
    address: string

    @Field((type) => String)
    @Column()
    ownerName: string

    @Field((type) => String)
    @Column()
    categoryName: string;
}
