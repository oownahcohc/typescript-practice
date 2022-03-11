export interface LoginDTO {
    readonly email: string;
    readonly password: string,
}

export interface SignupDTO extends LoginDTO {
    readonly nickname: string;
}

export interface TokenDTO {
    readonly accessToken: string;
    readonly refreshToken?: string;
}



export interface SocialDTO {
    readonly token?: string;
    readonly social?: string;
}



export interface UserInfo {
    readonly id: number;
    readonly social: string;
    readonly email: string;
    readonly nickname: string;
}



export interface AuthResultResponse extends BaseResponse, UserResponse {}

export interface BaseResponse {
    resultCode?: number;
    resultMessage?: string;
}

export interface UserResponse {
    readonly nickname: string;
    readonly accessToken?: string;
    readonly refreshToken?: string;
}

export type ErrorResponse = number;




