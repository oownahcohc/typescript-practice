export interface LoginDTO {
    readonly email: string;
    readonly password: string,
}

export interface SignupDTO extends LoginDTO {
    readonly nickname: string;
}

export interface TokenDTO {
    readonly accesstoken: string;
    readonly refreshtoken?: string;
}


export interface SocialDTO {
    readonly token?: string;
    readonly social?: string;
}



export interface UserInfo {
    readonly id?: number;
    readonly social?: string;
    readonly email?: string;
    readonly nickname?: string;
}


