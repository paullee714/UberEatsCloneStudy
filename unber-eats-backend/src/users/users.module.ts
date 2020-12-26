import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersSerivce } from './user.service';
import { UsersResolver } from './users.resolver';

@Module({
    imports:[TypeOrmModule.forFeature([User]),ConfigService],
    providers:[UsersResolver,UsersSerivce]
})
export class UsersModule {}
