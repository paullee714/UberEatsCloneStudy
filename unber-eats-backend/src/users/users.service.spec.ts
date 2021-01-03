import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { JwtService } from "src/jwt/jwt.service";
import { MailService } from "src/mail/mail.service";
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

describe("UserService",()=>{

    let service: UsersSerivce;    

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
    });

    it('should be defined',() => {
        expect(service).toBeDefined();
    })


    it.todo("createAccount");
    it.todo("login");
    it.todo("findById");
    it.todo("editProfile");
    it.todo("verifyEmail");
})