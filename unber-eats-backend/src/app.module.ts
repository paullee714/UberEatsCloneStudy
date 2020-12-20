import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { RestaurantsModule } from './restaurants/restaurants.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // 파일을 직접 가지고 있어야 함 
      autoSchemaFile: true, // 파일을 직접 가지고 있지 않아도 됨 -> 온메모리
    }),
    RestaurantsModule,
    TypeOrmModule.forRoot({
      type: 'postgres', 
      host: 'localhost',
      port: 5432,
      username: 'wool',
      password: 'qwerqwer123',
      database: 'uber-eats',
      synchronize: true,
      logging: true,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
