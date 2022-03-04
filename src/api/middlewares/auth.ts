import { NextFunction, Request, Response } from "express";
import resultCode from "../../constant/resultCode";
import resultMessage from "../../constant/resultMessage";
import { TokenDTO } from "../../interface/authDTO";
import { User } from "../../models";
import { ErrorResponse } from "../../modules/apiResponse";
import jwtHandler from "../../modules/jwtHandler";
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const isAuth = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    const { accessToken } = req.headers as unknown as TokenDTO
    if (!accessToken) {
        return ErrorResponse(res, resultCode.BAD_REQUEST, resultMessage.TOKEN_EMPTY);
    }

    try {
        const accessTokenDecoded = jwtHandler.verifyToken(accessToken);

        if (accessTokenDecoded === TOKEN_EXPIRED) {
            return ErrorResponse(res, resultCode.UNAUTHORIZED, resultMessage.TOKEN_EXPIRED);
        }
        if (accessTokenDecoded === TOKEN_INVALID) {
            return ErrorResponse(res, resultCode.UNAUTHORIZED, resultMessage.TOKEN_INVALID);
        }
        if (accessTokenDecoded.id === undefined) {
            return ErrorResponse(res, resultCode.UNAUTHORIZED, resultMessage.TOKEN_INVALID);
        }

        const userId = accessTokenDecoded.id;
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return ErrorResponse(res, resultCode.BAD_REQUEST, resultMessage.NO_USER)
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        console.error(`[AUTH ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, accessToken);
        ErrorResponse(res, resultCode.INTERNAL_SERVER_ERROR, resultMessage.INTERNAL_SERVER_ERROR);
    }
}

const authUtil = {
    isAuth,
}

export default authUtil;