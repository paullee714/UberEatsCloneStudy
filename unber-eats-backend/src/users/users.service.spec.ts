import { Test } from "@nestjs/testing";
import { UsersSerivce } from "./user.service";


describe("UserService",()=>{

    let service: UsersSerivce;    

    // create module
    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [
                UsersSerivce
            ]
        }).compile();
        service = module.get<UsersSerivce>(UsersSerivce)
    });

    it('be defined',() => {
        expect(service).toBeDefined();
    })


    it.todo("createAccount");
    it.todo("login");
    it.todo("findById");
    it.todo("editProfile");
    it.todo("verifyEmail");
})