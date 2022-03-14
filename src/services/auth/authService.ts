import { Service } from "typedi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import isEmail from "validator/lib/isEmail";

import Error from "../../constant/responseError";
import { NaverAuthAPI } from "./client/naverApiClient";
import { passwordValidator, verifyToken } from "../../modules/validator";
import { 
    LoginDTO, 
    TokenDTO, 
    SignupDTO,  
    SocialDTO,  
    UserInfo } from "./dto/authRequest";
import { AuthResponse, SignupResponse, Token} from "./dto/authResponse";

const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

@Service()
class AuthService {
    constructor(private readonly userModel) {}

    public async SignUp (signupDto: SignupDTO): Promise<SignupResponse> {
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


    public async LogIn (loginDto: LoginDTO): Promise<AuthResponse> {
        const { email, password } = loginDto;
        if(!email || !password) return Error.NULL_VALUE;
        //if (loginDto?.email || loginDto?.password) return Error.NULL_VALUE;

        try {
            const isUser = await this.userModel.findOne({ where: { email } });
            if (!isUser) return Error.NON_EXISTENT_USER;

            const isMatch = await bcrypt.compare(password, isUser.password);
            if (!isMatch) return Error.PW_NOT_CORRECT;
            
            // TODO: type 좁히기 생각해보자
            const accesstoken = this.issueAccessToken(isUser as UserInfo);
            const refreshtoken = this.issueRefreshToken();
            await this.userModel.update({
                token: refreshtoken,
            }, {
                where: { email }
            });

            return {
                user: {
                    nickname: isUser.nickname,
                    accesstoken,
                    refreshtoken
                }
            };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }



    public async ReissueToken (reissueTokenDto: TokenDTO): Promise<AuthResponse> {
        const { accesstoken, refreshtoken } = reissueTokenDto;
        if (!accesstoken || !refreshtoken) return Error.NULL_VALUE;

        try {
            //const refreshTokenDecoded = jwtHandler.verifyToken(refreshtoken);
            const refreshTokenDecoded = verifyToken(refreshtoken);
            /** @Error2 리프레시 토큰도 만료 => 재로그인 요청 */
            if (refreshTokenDecoded === TOKEN_EXPIRED || refreshTokenDecoded === TOKEN_INVALID) {
                return Error.TOKEN_EXPIRES;
            }
            const isUser = await this.userModel.findOne({ where: { token: refreshtoken } });
            if (!isUser) return Error.NON_EXISTENT_USER;

            //const { accesstoken } = jwtHandler.issueAccessToken(isUser);
            // TODO: type 좁히기 생각해보자
            const accesstoken = this.issueAccessToken(isUser);
            return {
                user: {
                    nickname: isUser.nickname,
                    accesstoken,
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
    ): Promise<AuthResponse> {
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

            const refreshtoken = this.issueRefreshToken();
            const socialUser = await this.userModel.findOrCreate({
                where: { email: user.email },
                defaults: {
                    social,
                    email: user.email,
                    nickname: user.nickname,
                    password: null,
                    token: refreshtoken
                }
            });
            const accesstoken = this.issueAccessToken(socialUser);
            return {
                user: {
                    nickname: user.nickname,
                    accesstoken,
                    refreshtoken
                }
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    private issueAccessToken (user: UserInfo): Token {
        const payload = {
            id: user.id,
            social: user.social,
            email: user.email,
            nickname: user.nickname
        };
        const accesstoken = jwt.sign(payload, process.env.JWT_SECRET, {
            issuer: process.env.JWT_ISSUER,
            expiresIn: process.env.JWT_AC_EXPIRES,
        });
        return accesstoken;
    }

    private issueRefreshToken (): Token {
        const refreshtoken = jwt.sign({}, process.env.JWT_SECRET, {
            issuer: process.env.JWT_ISSUER,
            expiresIn: process.env.JWT_RF_EXPIRES,
        });
        return refreshtoken;
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