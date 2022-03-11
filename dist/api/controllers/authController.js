"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const authService_1 = __importDefault(require("../../services/authService"));
const apiResponse_1 = require("../../modules/apiResponse");
const resultCode_1 = __importDefault(require("../../constant/resultCode"));
const resultMessage_1 = __importDefault(require("../../constant/resultMessage"));
// 회원가입
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const signupDto = req.body;
    try {
        //const authServiceInstance = Container.get(AuthService);
        const authServiceInstance = new authService_1.default(models_1.User);
        const data = yield authServiceInstance.SignUp(signupDto);
        /** @Error1 필수 요청 값 누락 */
        if (data === 1 /* NULL_VALUE */) {
            return (0, apiResponse_1.ErrorResponse)(res, resultCode_1.default.BAD_REQUEST, resultMessage_1.default.NULL_VALUE);
        }
        /** @Error2 이메일 형식 오류 */
        if (data === 2 /* WRONG_EMAIL_CONVENTION */) {
            return (0, apiResponse_1.ErrorResponse)(res, resultCode_1.default.BAD_REQUEST, resultMessage_1.default.WRONG_EMAIL_CONVENTION);
        }
        /** @Error3 비밀번호 형식 오류 */
        if (data === 4 /* WRONG_PASSWORD_CONVENTION */) {
            return (0, apiResponse_1.ErrorResponse)(res, resultCode_1.default.BAD_REQUEST, resultMessage_1.default.WRONG_PASSWORD_CONVENTION);
        }
        /** @Error4 이미 존재하는 유저 */
        if (data === 5 /* USER_ALREADY_EXIST */) {
            return (0, apiResponse_1.ErrorResponse)(res, resultCode_1.default.BAD_REQUEST, resultMessage_1.default.USER_ALREADY_EXIST);
        }
        /** @Error5 유저 생성 실패 */
        if (data === 16 /* FAIL_SIGNUP */) {
            return (0, apiResponse_1.ErrorResponse)(res, resultCode_1.default.BAD_REQUEST, resultMessage_1.default.FAIL_SIGNUP);
        }
        /** @Success 회원가입 성공 */
        return (0, apiResponse_1.SuccessResponse)(res, resultCode_1.default.CREATED, resultMessage_1.default.CREATED_USER, data);
    }
    catch (error) {
        console.log(error);
        (0, apiResponse_1.ErrorResponse)(res, resultCode_1.default.INTERNAL_SERVER_ERROR, resultMessage_1.default.INTERNAL_SERVER_ERROR);
    }
});
// 로그인
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginDto = req.body;
    try {
        const authServiceInstance = new authService_1.default(models_1.User);
        const data = yield authServiceInstance.LogIn(loginDto);
        /** @Error1 필수 요청 값 누락 */
        if (data === 1 /* NULL_VALUE */) {
            return (0, apiResponse_1.ErrorResponse)(res, resultCode_1.default.BAD_REQUEST, resultMessage_1.default.NULL_VALUE);
        }
        /** @Error2 존재하지 않는 유저 */
        if (data === 12 /* NON_EXISTENT_USER */) {
            return (0, apiResponse_1.ErrorResponse)(res, resultCode_1.default.BAD_REQUEST, resultMessage_1.default.NO_USER);
        }
        /** @Error3 비밀번호가 일치하지 않음 */
        if (data === 14 /* PW_NOT_CORRECT */) {
            return (0, apiResponse_1.ErrorResponse)(res, resultCode_1.default.BAD_REQUEST, resultMessage_1.default.MISS_MATCH_PW);
        }
        /** @Success 로그인 성공 */
        return (0, apiResponse_1.SuccessResponse)(res, resultCode_1.default.OK, resultMessage_1.default.LOGIN_SUCCESS, data);
    }
    catch (error) {
        console.error(error);
        (0, apiResponse_1.ErrorResponse)(res, resultCode_1.default.INTERNAL_SERVER_ERROR, resultMessage_1.default.INTERNAL_SERVER_ERROR);
    }
});
// 토큰 재발급
const reissueToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reissueTokenDto = req.headers;
    try {
        const authServiceInstance = new authService_1.default(models_1.User);
        const data = yield authServiceInstance.ReissueToken(reissueTokenDto);
        /** @Error1 필수 요청 값 누락 */
        if (data === 1 /* NULL_VALUE */) {
            return (0, apiResponse_1.ErrorResponse)(res, resultCode_1.default.BAD_REQUEST, resultMessage_1.default.NULL_VALUE);
        }
        /** @Error2 리프레시 토큰도 만료 => 재로그인 요청 */
        if (data === 17 /* TOKEN_EXPIRES */) {
            return (0, apiResponse_1.ErrorResponse)(res, resultCode_1.default.UNAUTHORIZED, resultMessage_1.default.PLEASE_LOGIN_AGAIN);
        }
        /** @Error3 해당 유저 없음 */
        if (data === 12 /* NON_EXISTENT_USER */) {
            return (0, apiResponse_1.ErrorResponse)(res, resultCode_1.default.BAD_REQUEST, resultMessage_1.default.NO_USER);
        }
        /** @Success 로그인 성공 */
        return (0, apiResponse_1.SuccessResponse)(res, resultCode_1.default.OK, resultMessage_1.default.REISSUE_TOKEN, data);
    }
    catch (error) {
        console.log(error);
        (0, apiResponse_1.ErrorResponse)(res, resultCode_1.default.INTERNAL_SERVER_ERROR, resultMessage_1.default.INTERNAL_SERVER_ERROR);
    }
});
// 소셜 로그인
const socialLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenDto = req.query;
    const socialDto = req.params;
    try {
        const authServiceInstance = new authService_1.default(models_1.User);
        const data = yield authServiceInstance.SocialLogin(tokenDto, socialDto);
        /** @Error1 필수 요청 값 누락 */
        if (data === 1 /* NULL_VALUE */) {
            return (0, apiResponse_1.ErrorResponse)(res, resultCode_1.default.BAD_REQUEST, resultMessage_1.default.NULL_VALUE);
        }
        (0, apiResponse_1.SuccessResponse)(res, resultCode_1.default.CREATED, resultMessage_1.default.LOGIN_SUCCESS, data);
    }
    catch (error) {
        console.log(error);
        (0, apiResponse_1.ErrorResponse)(res, resultCode_1.default.INTERNAL_SERVER_ERROR, resultMessage_1.default.INTERNAL_SERVER_ERROR);
    }
});
// 로그아웃
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userDto = req.user;
    try {
        const authServiceInstance = new authService_1.default(models_1.User);
        const data = yield authServiceInstance.LogOut(userDto);
        return (0, apiResponse_1.SuccessResponse)(res, resultCode_1.default.OK, resultMessage_1.default.LOGOUT_SUCCESS, data);
    }
    catch (error) {
        console.log(error);
        (0, apiResponse_1.ErrorResponse)(res, resultCode_1.default.INTERNAL_SERVER_ERROR, resultMessage_1.default.INTERNAL_SERVER_ERROR);
    }
});
const authController = {
    signup,
    login,
    logout,
    reissueToken,
    socialLogin,
};
exports.default = authController;
//# sourceMappingURL=authController.js.map