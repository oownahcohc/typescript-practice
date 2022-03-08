export interface SignupDTO {
    readonly email: string;
    readonly password: string,
    readonly nickname?: string;
}


export interface LoginDTO {
    readonly email: string;
    readonly password: string,
}


export interface TokenDTO {
    readonly accessToken: string;
    readonly refreshToken?: string;
}

