export interface SignupDTO {
    email: string;
    password: string,
    nickname: string;
}


export interface LoginDTO {
    email: string;
    password: string,
}


export interface TokenDTO {
    accessToken: string;
    refreshToken: string;
}

