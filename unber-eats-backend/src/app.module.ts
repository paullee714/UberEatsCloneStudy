import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { Restaurant } from './restaurants/entities/restaurant.entity';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { User } from './users/entities/user.entity';
import { JwtModule } from './jwt/jwt.module';
import { JwtMiddleWare } from './jwt/jwt.middleware';
// import { jwtMiddleware } from './jwt/jwt.middleware';
// import { JwtMiddleWare } from './jwt/jwt.middleware';
import { AuthModule } from './auth/auth.module';
import { Verification } from './users/entities/verification.entity';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: process.env.NODE_ENV === "dev" ? ".env.dev" : ".env.test",
      ignoreEnvFile: process.env.NODE_ENV === "prod",
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev','prod').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        PRIVATE_KEY: Joi.string().required(),
        MAILGUN_API_KEY : Joi.string().required(),
        MAILGUN_DOMAIN_NAME : Joi.string().required(),
        MAILGUN_FROM_EMAIL : Joi.string().required(),
      })
    }),
    TypeOrmModule.forRoot({
      type: 'postgres', 
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: process.env.NODE_ENV !== 'prod',
      logging: true,
      entities:[User,Verification]
    }),
    GraphQLModule.forRoot({
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // 파일을 직접 가지고 있어야 함 
      autoSchemaFile: true, // 파일을 직접 가지고 있지 않아도 됨 -> 온메모리
      context:({req}) => ({user: req['user']})
    }),
    JwtModule.forRoot({
      privateKey:process.env.PRIVATE_KEY
    }),
    UsersModule,
    MailModule.forRoot({
      apikey:process.env.MAILGUN_API_KEY,
      domain:process.env.MAILGUN_DOMAIN_NAME,
      fromEmail:process.env.MAILGUN_FROM_EMAIL,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    // jwtMiddleware를 클래스로 작성 했을 경우 
    consumer.apply(JwtMiddleWare).forRoutes({
      path:"/graphql",
      method: RequestMethod.POST,
    })
    // jwtMiddleware에서 경로를 '제외'하고 싶을때
    // consumer.apply(JwtMiddleWare).exclude({
    //   path:'/api',
    //   method:RequestMethod.ALL
    // })

    // jwtMiddleware를 함수로 작성 했을 때
    // consumer.apply(jwtMiddleware).forRoutes({
    //   path:'/graphql',
    //   method:RequestMethod.ALL,
    // })
  }

}
