import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { Restaurant } from "./entities/restaurant.entity";
import { RestaurantService } from "./restaurants.service";
@Resolver(of => Restaurant)
export class RestaurantResolver{

    constructor(private readonly restaurantService: RestaurantService){}

    @Query(returns => [Restaurant])
    myRestaurant():Promise<Restaurant[]>{
        return this.restaurantService.getAll();
    }

    @Mutation(returns => Boolean)
    createRestaurant(
        // 각각 한개씩 받을 수도 있지만
        // @Args('name') name:string,
        // @Args('isVegan') isVegan:boolean,
        // @Args('address') address:string,
        // @Args('ownerName') ownerName:string
        
        //input Type으로 지정해서 받을 수도 있다. -> dto 생성 후 가져오기
        @Args() createRestaurantInput:CreateRestaurantDto
    ): boolean{
        return true
    }

}