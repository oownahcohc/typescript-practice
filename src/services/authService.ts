import { Service } from "typedi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import isEmail from "validator/lib/isEmail";

import Error from "../constant/responseError";
import { NaverAuthAPI } from "../modules/clientApi";
import { passwordValidator, verifyToken } from "../modules/validator";
import { 
    LoginDTO, 
    TokenDTO, 
    SignupDTO, 
    UserResponse, 
    SocialDTO, 
    ErrorResponse, 
    UserInfo } from "../interface/authDTO";

const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

@Service()
class AuthService {
    constructor(private readonly userModel) {}

    public async SignUp (signupDto: SignupDTO): Promise<ErrorResponse | UserResponse> {
        const { email, password, nickname } = signupDto;
        if (!email || !password || !nickname) return Error.NULL_VALUE;
        if (!isEmail(email)) return Error.WRONG_EMAIL_CONVENTION;
        if (!passwordValidator(password)) return Error.WRONG_PASSWORD_CONVENTION;

        try {
            const existUser = await this.userModel.findOne({ where: { email }});
            if (existUser) return Error.USER_ALREADY_EXIST;

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = await this.userModel.create({
                ...signupDto, // 전개 연산자: signupDto안에 담긴거 쫙 펼쳐줌 ㅋㅋ
                password: hashedPassword,
            });
            if (!newUser) return Error.FAIL_SIGNUP;

            return { nickname: newUser.nickname };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    public async LogIn (loginDto: LoginDTO): Promise<ErrorResponse | { user: UserResponse }> {
        const { email, password } = loginDto;
        if(!email || !password) return Error.NULL_VALUE;
        //if (loginDto?.email || loginDto?.password) return Error.NULL_VALUE;

        try {
            const isUser = await this.userModel.findOne({ where: { email } });
            if (!isUser) return Error.NON_EXISTENT_USER;

            const isMatch = await bcrypt.compare(password, isUser.password);
            if (!isMatch) return Error.PW_NOT_CORRECT;
            
            // TODO: type 좁히기 생각해보자
            const accessToken = this.issueAccessToken(isUser as UserInfo);
            const refreshToken = this.issueRefreshToken();
            await this.userModel.update({
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
        } catch (error) {
            console.log(error);
            throw error;
        }
    }



    public async ReissueToken (reissueTokenDto: TokenDTO): Promise<ErrorResponse | { user: UserResponse }> {
        const { accessToken, refreshToken } = reissueTokenDto;
        if (!accessToken || !refreshToken) return Error.NULL_VALUE;

        try {
            //const refreshTokenDecoded = jwtHandler.verifyToken(refreshToken);
            const refreshTokenDecoded = verifyToken(refreshToken);
            /** @Error2 리프레시 토큰도 만료 => 재로그인 요청 */
            if (refreshTokenDecoded === TOKEN_EXPIRED || refreshTokenDecoded === TOKEN_INVALID) {
                return Error.TOKEN_EXPIRES;
            }
            const isUser = await this.userModel.findOne({ where: { token: refreshToken } });
            if (!isUser) return Error.NON_EXISTENT_USER;

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
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    public async SocialLogin (
        tokenDto: SocialDTO, 
        socialDto: SocialDTO
    ): Promise<ErrorResponse | { user: UserResponse }> {
        const { token } = tokenDto;
        const { social } = socialDto;
        if (!token || !social) return Error.NULL_VALUE;

        let user;
        try {
            switch (social) {
                case "naver": 
                    user = await NaverAuthAPI(token);
                    break;
                case "kakao": 
                    user = await NaverAuthAPI(token);
                    break;
                case "apple": 
                    user = await NaverAuthAPI(token);
                    break;
            }

            const refreshToken = this.issueRefreshToken();
            const socialUser = await this.userModel.findOrCreate({
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
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    private issueAccessToken (user: UserInfo): string {
        const payload = { 
            id: user.id,
            social: user.social,
            email: user.email,
            nickname: user.nickname
        };
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
            issuer: process.env.JWT_ISSUER,
            expiresIn: process.env.JWT_AC_EXPIRES,
        });
        return accessToken;
    }

    private issueRefreshToken (): string {
        const refreshToken = jwt.sign({}, process.env.JWT_SECRET, {
            issuer: process.env.JWT_ISSUER,
            expiresIn: process.env.JWT_RF_EXPIRES,
        });
        return refreshToken;
    }


    public async LogOut (userDto: LoginDTO): Promise<boolean> {
        const { email } = userDto;
        try {
            await this.userModel.update({
                token: null,
            }, {
                where: { email }
            });
            return true;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default AuthService;