import { Service } from "typedi";
import { LoginDTO, TokenDTO, SignupDTO } from "../interface/authDTO";
import bcrypt from "bcryptjs";
import jwtHandler from "../modules/jwtHandler";
import Error from "../constant/responseError";
import isEmail from "validator/lib/isEmail";
import { passwordValidator } from "../modules/validator";
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

@Service()
class AuthService {
    constructor(private userModel) {}


    public async SignUp (signupDto: SignupDTO) {
        const { email, password, nickname } = signupDto;
        /** @Error1 필수 요청 값 누락 */
        if(!email || !password || !nickname) return Error.NULL_VALUE;
        /** @Error2 이메일 형식 오류 */
        if (!isEmail(email)) return Error.WRONG_EMAIL_CONVENTION;
        /** @Error3 비밀번호 형식 오류 */
        if (!passwordValidator(password)) return Error.WRONG_PASSWORD_CONVENTION;

        try {
            const existUser = await this.userModel.findOne({ where: { email }});
            /** @Error4 이미 존재하는 유저 */
            if (existUser) return Error.USER_ALREADY_EXIST;

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = await this.userModel.create({
                ...signupDto, // 전개 연산자: signupDto안에 담긴거 쫙 펼쳐줌 ㅋㅋ
                password: hashedPassword,
            });
            /** @Error5 유저 생성 실패 */
            if (!newUser) return Error.FAIL_SIGNUP;

            return { nickname: newUser.nickname };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    public async LogIn (loginDto: LoginDTO) {
        const { email, password } = loginDto;
        /** @Error1 필수 요청 값 누락 */
        if(!email || !password) return Error.NULL_VALUE;
        //if (loginDto?.email || loginDto?.password) return Error.NULL_VALUE;

        try {
            const isUser = await this.userModel.findOne({ where: { email } });
            /** @Error2 존재하지 않는 유저 */
            if (!isUser) return Error.NON_EXISTENT_USER;

            const isMatch = await bcrypt.compare(password, isUser.password);
            /** @Error3 비밀번호가 일치하지 않음 */
            if (!isMatch) return Error.PW_NOT_CORRECT;
            
            const { accessToken } = jwtHandler.issueAccessToken(isUser);
            const { refreshToken } = jwtHandler.issueRefreshToken();
            await this.userModel.update({
                token: refreshToken,
            }, {
                where: { email }
            });

            return {
                user: {
                    social: isUser.social,
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


    public async ReissueToken (reissueTokenDto: TokenDTO) {
        const { accessToken, refreshToken } = reissueTokenDto;
        /** @Error1 필수 요청 값 누락 */
        if (!accessToken || !refreshToken) return Error.NULL_VALUE;

        try {
            const refreshTokenDecoded = jwtHandler.verifyToken(refreshToken);
            /** @Error2 리프레시 토큰도 만료 => 재로그인 요청 */
            if (refreshTokenDecoded === TOKEN_EXPIRED || refreshTokenDecoded === TOKEN_INVALID) {
                return Error.TOKEN_EXPIRES;
            }
            const isUser = await this.userModel.findOne({ where: { token: refreshToken } });
            /** @Error3 해당 유저 없음 */
            if (!isUser) return Error.NON_EXISTENT_USER;

            const { accessToken } = jwtHandler.issueAccessToken(isUser);
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
}

export default AuthService;