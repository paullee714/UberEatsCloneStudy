import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto";
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
    async createRestaurant(
        // 각각 한개씩 받을 수도 있지만
        // @Args('name') name:string,
        // @Args('isVegan') isVegan:boolean,
        // @Args('address') address:string,
        // @Args('ownerName') ownerName:string
        
        //input Type으로 지정해서 받을 수도 있다. -> dto 생성 후 가져오기
        @Args('input') createRestaurantDto:CreateRestaurantDto
    ): Promise<boolean>{
        try{
            await this.restaurantService.createRestaurant(createRestaurantDto);
            return true
        }catch(e){
            console.log(e)
            return false
        }
    }

    @Mutation(returns => Boolean)
    async updateRestaurant(
        @Args() updateRestaurantDto: UpdateRestaurantDto
    ): Promise<boolean>{
        try{
            await this.restaurantService.updateRestaurant(updateRestaurantDto)
            return true;
        }catch(e){
            console.log(e);
            return false;
        }
    }

}