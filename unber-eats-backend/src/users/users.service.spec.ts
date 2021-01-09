import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { JwtService } from "src/jwt/jwt.service";
import { MailService } from "src/mail/mail.service";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { Verification } from "./entities/verification.entity";
import { UsersSerivce } from "./user.service";


const mockRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
}

const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
}

const mockMailService = {
    sendVerificatioNEmail:jest.fn(),
}


type MockRepository<T = any> = Partial<Record<keyof Repository<T>,jest.Mock>>; 

describe("UserService",()=>{

    let service: UsersSerivce;    
    let usersRepository:MockRepository<User>

    // create module
    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [UsersSerivce,
                {
                    provide: getRepositoryToken(User),
                    useValue:mockRepository
                },
                {
                    provide: getRepositoryToken(Verification),
                    useValue:mockRepository
                },
                {
                    provide: JwtService,
                    useValue: mockJwtService
                },
                {
                    provide: MailService,
                    useValue: mockMailService
                }
            ]
        }).compile();
        service = module.get<UsersSerivce>(UsersSerivce)
        usersRepository = module.get(getRepositoryToken(User))
    });

    it('should be defined',() => {
        expect(service).toBeDefined();
    })


    // it.todo("createAccount");
    describe('createAccount', () => {
        it("should fail if user exists",() => {
            usersRepository.findOne.mockResolvedValue({
                id:1,
                email:'lalalal',
            });
            service.createAccount({
                email: '',
                password:'',
                role:0,
            })
        });
    })
    

    it.todo("login");
    it.todo("findById");
    it.todo("editProfile");
    it.todo("verifyEmail");
})