// controller 에서는 req, res에 대한 응답을 해줌
// service 의존성 주입을 하고, dto형식, 응답 형식에 대한 ~
// import Container from "typedi";
import { Request, Response } from "express";
import { LoginDTO, TokenDTO, SignupDTO } from "../../interface/authDTO";
import Error from "../../constant/responseError";
import { User } from "../../models";
import AuthService from "../../services/authService";
import { ErrorResponse, SuccessResponse } from "../../modules/apiResponse";
import sc from "../../constant/resultCode";
import rm from "../../constant/resultMessage";


// 회원가입
const signup = async (req: Request, res: Response) => {
    const signupDto = req.body as SignupDTO
    try {
        //const authServiceInstance = Container.get(AuthService);
        const authServiceInstance = new AuthService(User)
        const data = await authServiceInstance.SignUp(signupDto);
        if (data === Error.NULL_VALUE) {
            return ErrorResponse(res, sc.BAD_REQUEST, rm.NULL_VALUE);
        }
        else if (data === Error.WRONG_EMAIL_CONVENTION) {
            return ErrorResponse(res, sc.BAD_REQUEST, rm.WRONG_EMAIL_CONVENTION);
        }
        else if (data === Error.WRONG_PASSWORD_CONVENTION) {
            return ErrorResponse(res, sc.BAD_REQUEST, rm.WRONG_PASSWORD_CONVENTION);
        }
        else if (data === Error.USER_ALREADY_EXIST) {
            return ErrorResponse(res, sc.BAD_REQUEST, rm.USER_ALREADY_EXIST);
        }
        else if (data === Error.FAIL_SIGNUP) {
            return ErrorResponse(res,sc.BAD_REQUEST,rm.FAIL_SIGNUP);
        }
        else {
            return SuccessResponse(res, sc.CREATED, rm.CREATED_USER, data);
        }
    } catch (error) {
        console.log(error);
        ErrorResponse(res, sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR);
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
        return SuccessResponse(res,sc.OK,rm.LOGIN_SUCCESS,
            data
        );
    } catch (error) {
        console.error(error);
        ErrorResponse(res, sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR
        );
    }
};

// 로그아웃
const logout = async (req: Request, res: Response) => {
    const userDto = req.user as LoginDTO
    try {
        const authServiceInstance = new AuthService(User);
        const data = await authServiceInstance.LogOut(userDto);
        return SuccessResponse(res,sc.OK,rm.LOGOUT_SUCCESS,data);
    } catch (error) {
        console.log(error);
        ErrorResponse(res, sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR);
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
        return SuccessResponse(res,sc.OK,rm.REISSUE_TOKEN,data);
    } catch (error) {
        console.log(error);
        ErrorResponse(res, sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR);
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
    //         sc.OK,
    //         rm.REISSUE_TOKEN,
    //         data
    //     );
    // } catch (error) {
    //     console.log(error);
    //     ErrorResponse(
    //         res,
    //         sc.INTERNAL_SERVER_ERROR,
    //         rm.INTERNAL_SERVER_ERROR
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