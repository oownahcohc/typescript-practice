import assert from "assert";

import AuthService from "../../src/services/auth/authService"
import { User } from "../../src/models"
import { SignupDTO } from "../../src/interface/dto/request/authRequest";
import Error from "../../src/constant/responseError";



describe("/api/auth", () => {
    const authServiceInstance = new AuthService(User);
    let testUser: SignupDTO;

    describe("[POST] /signup", () => {
        it("[400] null value", async() => {
            testUser= {
                email: "",
                password: "",
                nickname: ""
            };
            const user = await authServiceInstance.SignUp(testUser);
            assert.strictEqual(user, Error.NULL_VALUE);
        });



        it("[400] wrong email convention", async() => {
            testUser = {
                email: "test1234user.com",
                password: "1q2w3e4r!",
                nickname: "테스트"
            };
            const user = await authServiceInstance.SignUp(testUser);
            assert.strictEqual(user, Error.WRONG_EMAIL_CONVENTION)
        });



        it("[400] user already exist", async() => {
            await User.create({
                email: "test0000@user.com",
                password: "test1234!",
                nickname: "테스팅유저"
            });
            const user = await authServiceInstance.SignUp(testUser);
            assert.strictEqual(user, Error.USER_ALREADY_EXIST);
        });
    });

});