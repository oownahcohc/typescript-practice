export interface LoginDTO {
    readonly email: string;
    readonly password: string,
}

export interface SignupDTO extends LoginDTO {
    readonly nickname?: string;
}

export interface TokenDTO {
    readonly accessToken: string;
    readonly refreshToken?: string;
}


export interface UserResponse {
    readonly id: number;
    readonly social: string;
    readonly email: string;
    readonly nickname: string;
}