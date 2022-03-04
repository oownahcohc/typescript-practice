// controller 에서는 req, res에 대한 응답을 해줌
// service 의존성 주입을 하고, dto형식, 응답 형식에 대한 ~
// import Container from "typedi";
import { Request, Response } from "express";
import { LoginDTO, TokenDTO, SignupDTO } from "../../interface/authDTO";
import responseError from "../../constant/responseError";
import { User } from "../../models";
import AuthService from "../../services/authService";
import { ErrorResponse, SuccessResponse } from "../../modules/apiResponse";
import resultCode from "../../constant/resultCode";
import resultMessage from "../../constant/resultMessage";


// 회원가입
const signup = async (req: Request, res: Response) => {
    const signupDto = req.body as SignupDTO
    try {
        //const authServiceInstance = Container.get(AuthService);
        const authServiceInstance = new AuthService(User)
        const data = await authServiceInstance.SignUp(signupDto);
        if (data === responseError.NULL_VALUE) {
            return ErrorResponse(
                res, 
                resultCode.BAD_REQUEST, 
                resultMessage.NULL_VALUE
            );
        }
        else if (data === responseError.WRONG_EMAIL_CONVENTION) {
            return ErrorResponse(
                res, 
                resultCode.BAD_REQUEST, 
                resultMessage.WRONG_EMAIL_CONVENTION
            );
        }
        else if (data === responseError.WRONG_PASSWORD_CONVENTION) {
            return ErrorResponse(
                res, 
                resultCode.BAD_REQUEST, 
                resultMessage.WRONG_PASSWORD_CONVENTION
            );
        }
        else if (data === responseError.USER_ALREADY_EXIST) {
            return ErrorResponse(
                res, 
                resultCode.BAD_REQUEST, 
                resultMessage.USER_ALREADY_EXIST
            );
        }
        else if (data === responseError.FAIL_SIGNUP) {
            return ErrorResponse(
                res,
                resultCode.BAD_REQUEST,
                resultMessage.FAIL_SIGNUP
            );
        }
        else {
            return SuccessResponse(
                res,
                resultCode.CREATED,
                resultMessage.CREATED_USER,
                data
            );
        }
    } catch (error) {
        console.log(error);
        ErrorResponse(
            res,
            resultCode.INTERNAL_SERVER_ERROR,
            resultMessage.INTERNAL_SERVER_ERROR
        );
    }
};

 // 로그인
const login = async (req: Request, res: Response) => {
    const loginDto = req.body as LoginDTO
    try {
        const authServiceInstance = new AuthService(User);
        const data = await authServiceInstance.LogIn(loginDto);
        /** @Error1 필수 요청 값 누락 */
        /** @Error2 존재하지 않는 유저 */
        /** @Error3 비밀번호가 일치하지 않음 */
        return SuccessResponse(
            res,
            resultCode.OK,
            resultMessage.LOGIN_SUCCESS,
            data
        );
    } catch (error) {
        console.log(error);
        ErrorResponse(
            res,
            resultCode.INTERNAL_SERVER_ERROR,
            resultMessage.INTERNAL_SERVER_ERROR
        );
    }
};

// 로그아웃
const logout = async (req: Request, res: Response) => {
    const userDto = req.user as LoginDTO
    try {
        const authServiceInstance = new AuthService(User);
        const data = await authServiceInstance.LogOut(userDto);
        return SuccessResponse(
            res,
            resultCode.OK,
            resultMessage.LOGOUT_SUCCESS,
            data
        );
    } catch (error) {
        console.log(error);
        ErrorResponse(
            res,
            resultCode.INTERNAL_SERVER_ERROR,
            resultMessage.INTERNAL_SERVER_ERROR
        );
    }
};

// 토큰 재발급
const reissueToken = async (req: Request, res: Response) => {
    const reissueTokenDto = req.headers as unknown as TokenDTO
    try {
        const authServiceInstance = new AuthService(User);
        const data = await authServiceInstance.ReissueToken(reissueTokenDto);
        /** @Error1 필수 요청 값 누락 */
        /** @Error2 리프레시 토큰도 만료 => 재로그인 요청 */
        /** @Error3 해당 유저 없음 */
        return SuccessResponse(
            res,
            resultCode.OK,
            resultMessage.REISSUE_TOKEN,
            data
        );
    } catch (error) {
        console.log(error);
        ErrorResponse(
            res,
            resultCode.INTERNAL_SERVER_ERROR,
            resultMessage.INTERNAL_SERVER_ERROR
        );
    }

};

// 소셜 로그인
const socialLogin = async (req: Request, res: Response) => {
    // const reissueTokenDto = req.headers as unknown as TokenDTO
    // try {
    //     const authServiceInstance = new AuthService(User);
    //     const data = await authServiceInstance.ReissueToken(reissueTokenDto);
    //     /** @Error1 필수 요청 값 누락 */
    //     /** @Error2 리프레시 토큰도 만료 => 재로그인 요청 */
    //     /** @Error3 해당 유저 없음 */
    //     return SuccessResponse(
    //         res,
    //         resultCode.OK,
    //         resultMessage.REISSUE_TOKEN,
    //         data
    //     );
    // } catch (error) {
    //     console.log(error);
    //     ErrorResponse(
    //         res,
    //         resultCode.INTERNAL_SERVER_ERROR,
    //         resultMessage.INTERNAL_SERVER_ERROR
    //     );
    // }
}



const authController = {
    signup,
    login,
    logout,
    reissueToken,
    socialLogin,
};

export default authController;