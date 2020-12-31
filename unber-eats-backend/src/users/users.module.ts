import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { User } from './entities/user.entity';
import { UsersSerivce } from './user.service';
import { UsersResolver } from './users.resolver';

@Module({
    imports:[TypeOrmModule.forFeature([User])],
    providers:[UsersResolver,UsersSerivce],
    exports: [UsersSerivce],
})
export class UsersModule {}
