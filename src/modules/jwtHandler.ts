import jwt from "jsonwebtoken";
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

export default {
    // 액세스 토큰 발급
    issueAccessToken: (user: any) => {
        const payload = {
            id: user.id,
            social: user.social,
            email: user.email,
            nickname: user.nickname,
            //exp: Math.floor(Date.now()/1000) + (60 * 60),
        };

        const result = {
            accessToken: jwt.sign(payload, process.env.JWT_SECRETE, {
                //algoritm: process.env.JWT_ALGORITHM,
                issuer: process.env.JWT_ISSUER,
                expiresIn: process.env.JWT_AC_EXPIRES,
            })
        };
        return result;
    },

    // 리프레쉬 토큰 발급
    issueRefreshToken: () => {
        const result = {
            refreshToken: jwt.sign({}, process.env.JWT_SECRETE, {
                //algoritm: process.env.JWT_ALGORITHM,
                issuer: process.env.JWT_ISSUER,
                expiresIn: process.env.JWT_RF_EXPIRES,
            })
        };
        return result;
    },

    // 토큰 검증 함수
    verifyToken: (token: any) => {
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRETE);
        } catch (error) {
            if (error.message === "jwt expired") {
                console.log("토큰이 만료되었습니다");
                return TOKEN_EXPIRED;
            } else if (error.message === "jwt invalid") {
                console.log("토큰이 유효하지 않습니다");
                return TOKEN_INVALID;
            } else {
                console.log("토큰 검증 오류")
                return TOKEN_INVALID;
            }
        }
        return decoded;
    }
}