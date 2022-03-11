"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const typedi_1 = require("typedi");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isEmail_1 = __importDefault(require("validator/lib/isEmail"));
const clientApi_1 = require("../modules/clientApi");
const validator_1 = require("../modules/validator");
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;
let AuthService = class AuthService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    SignUp(signupDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, nickname } = signupDto;
            if (!email || !password || !nickname)
                return 1 /* NULL_VALUE */;
            if (!(0, isEmail_1.default)(email))
                return 2 /* WRONG_EMAIL_CONVENTION */;
            if (!(0, validator_1.passwordValidator)(password))
                return 4 /* WRONG_PASSWORD_CONVENTION */;
            try {
                const existUser = yield this.userModel.findOne({ where: { email } });
                if (existUser)
                    return 5 /* USER_ALREADY_EXIST */;
                const salt = yield bcryptjs_1.default.genSalt(10);
                const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
                const newUser = yield this.userModel.create(Object.assign(Object.assign({}, signupDto), { password: hashedPassword }));
                if (!newUser)
                    return 16 /* FAIL_SIGNUP */;
                return { nickname: newUser.nickname };
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    LogIn(loginDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = loginDto;
            if (!email || !password)
                return 1 /* NULL_VALUE */;
            //if (loginDto?.email || loginDto?.password) return Error.NULL_VALUE;
            try {
                const isUser = yield this.userModel.findOne({ where: { email } });
                if (!isUser)
                    return 12 /* NON_EXISTENT_USER */;
                const isMatch = yield bcryptjs_1.default.compare(password, isUser.password);
                if (!isMatch)
                    return 14 /* PW_NOT_CORRECT */;
                // TODO: type 좁히기 생각해보자
                const accessToken = this.issueAccessToken(isUser);
                const refreshToken = this.issueRefreshToken();
                yield this.userModel.update({
                    token: refreshToken,
                }, {
                    where: { email }
                });
                return {
                    user: {
                        nickname: isUser.nickname,
                        accessToken,
                        refreshToken
                    }
                };
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    ReissueToken(reissueTokenDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { accessToken, refreshToken } = reissueTokenDto;
            if (!accessToken || !refreshToken)
                return 1 /* NULL_VALUE */;
            try {
                //const refreshTokenDecoded = jwtHandler.verifyToken(refreshToken);
                const refreshTokenDecoded = (0, validator_1.verifyToken)(refreshToken);
                /** @Error2 리프레시 토큰도 만료 => 재로그인 요청 */
                if (refreshTokenDecoded === TOKEN_EXPIRED || refreshTokenDecoded === TOKEN_INVALID) {
                    return 17 /* TOKEN_EXPIRES */;
                }
                const isUser = yield this.userModel.findOne({ where: { token: refreshToken } });
                if (!isUser)
                    return 12 /* NON_EXISTENT_USER */;
                //const { accessToken } = jwtHandler.issueAccessToken(isUser);
                // TODO: type 좁히기 생각해보자
                const accessToken = this.issueAccessToken(isUser);
                return {
                    user: {
                        nickname: isUser.nickname,
                        accessToken,
                        // exp ???
                    }
                };
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    SocialLogin(tokenDto, socialDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = tokenDto;
            const { social } = socialDto;
            if (!token || !social)
                return 1 /* NULL_VALUE */;
            let user;
            try {
                switch (social) {
                    case "naver":
                        user = yield (0, clientApi_1.NaverAuthAPI)(token);
                        break;
                    case "kakao":
                        user = yield (0, clientApi_1.NaverAuthAPI)(token);
                        break;
                    case "apple":
                        user = yield (0, clientApi_1.NaverAuthAPI)(token);
                        break;
                }
                const refreshToken = this.issueRefreshToken();
                const socialUser = yield this.userModel.findOrCreate({
                    where: { email: user.email },
                    defaults: {
                        social,
                        email: user.email,
                        nickname: user.nickname,
                        password: null,
                        token: refreshToken
                    }
                });
                const accessToken = this.issueAccessToken(socialUser);
                return {
                    user: {
                        nickname: user.nickname,
                        accessToken,
                        refreshToken
                    }
                };
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    issueAccessToken(user) {
        const payload = {
            id: user.id,
            social: user.social,
            email: user.email,
            nickname: user.nickname
        };
        const accessToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
            issuer: process.env.JWT_ISSUER,
            expiresIn: process.env.JWT_AC_EXPIRES,
        });
        return accessToken;
    }
    issueRefreshToken() {
        const refreshToken = jsonwebtoken_1.default.sign({}, process.env.JWT_SECRET, {
            issuer: process.env.JWT_ISSUER,
            expiresIn: process.env.JWT_RF_EXPIRES,
        });
        return refreshToken;
    }
    LogOut(userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = userDto;
            try {
                yield this.userModel.update({
                    token: null,
                }, {
                    where: { email }
                });
                return true;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
};
AuthService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [Object])
], AuthService);
exports.default = AuthService;
//# sourceMappingURL=authService.js.map