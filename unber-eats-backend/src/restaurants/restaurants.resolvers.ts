import { Args, Query, Resolver } from "@nestjs/graphql";
import { Restaurant } from "./entities/restaurant.entity";
@Resolver(of => Restaurant)
export class RestaurantResolver{
    
    @Query(returns => [Restaurant])
    myRestaurant(@Args('veganOnly') VeganOnly: boolean):Restaurant[]{
        return [];
    }

}