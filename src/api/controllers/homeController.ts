import { ErrorResponse } from "../../modules/apiResponse";
import { Request, Response } from "express";
import sc from "../../constant/resultCode"
import rm from "../../constant/resultMessage"

const getMainPage = async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        console.log(error);
        ErrorResponse(res, sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR);
    }
}

const homeController = {
    getMainPage,
};

export default homeController;