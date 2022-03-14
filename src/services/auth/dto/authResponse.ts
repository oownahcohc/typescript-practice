
interface AuthResultResponse extends BaseResponse, UserResponse {}

interface BaseResponse {
    resultCode?: number;
    resultMessage?: string;
}

interface UserResponse {
    readonly nickname: string;
    readonly accesstoken?: string;
    readonly refreshtoken?: string;
}
type ErrorResponse = number;
type SignupResponse = ErrorResponse | UserResponse;
type AuthResponse = ErrorResponse | { user: UserResponse };

type Token = string;

export {
    AuthResultResponse,
    BaseResponse,
    SignupResponse,
    AuthResponse,
    Token
}