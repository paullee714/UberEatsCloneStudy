import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";


@Injectable()
export class AuthGuard implements CanActivate{
    // return에 따라 request 진행 여부를 판단한다
    // return ture : request를 그대로 진행
    // return false : request를 멈춤
    canActivate(context: ExecutionContext){
        // console.log(context)
        const graphqlContext = GqlExecutionContext.create(context).getContext()
        // console.log(graphqlContext)
        const user = graphqlContext['user']
        // console.log(user)
        if(!user){
            return false
        }else{
            return true;
        }
        
    }
}
