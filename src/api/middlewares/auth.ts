import { NextFunction, Request, Response } from "express";
import sc from "../../constant/resultCode";
import rm from "../../constant/resultMessage";
import { TokenDTO } from "../../services/auth/dto/authRequest";
import { User } from "../../models";
import { ErrorResponse } from "../../modules/apiResponse";
import { verifyToken } from "../../modules/validator";
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const isAuth = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    const { accesstoken } = req.headers as unknown as TokenDTO
    if (!accesstoken) {
        return ErrorResponse(res, sc.BAD_REQUEST, rm.TOKEN_EMPTY);
    }

    try {
        const accessTokenDecoded = verifyToken(accesstoken);

        if (accessTokenDecoded === TOKEN_EXPIRED) {
            return ErrorResponse(res, sc.UNAUTHORIZED, rm.TOKEN_EXPIRED);
        }
        if (accessTokenDecoded === TOKEN_INVALID) {
            return ErrorResponse(res, sc.UNAUTHORIZED, rm.TOKEN_INVALID);
        }
        if (accessTokenDecoded.id === undefined) {
            return ErrorResponse(res, sc.UNAUTHORIZED, rm.TOKEN_INVALID);
        }

        const userId = accessTokenDecoded.id;
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return ErrorResponse(res, sc.BAD_REQUEST, rm.NO_USER)
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        console.error(`[AUTH ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, accesstoken);
        ErrorResponse(res, sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR);
    }
}

const authUtil = {
    isAuth,
}

export default authUtil;