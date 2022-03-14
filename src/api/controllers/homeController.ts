import { ErrorResponse, SuccessResponse } from "../../modules/apiResponse";
import { Request, Response } from "express";
import sc from "../../constant/resultCode"
import rm from "../../constant/resultMessage"
import HomeService from "../../services/home/homeService";
import { Post } from "../../models";

const getMainPage = async (req: Request, res: Response) => {
    try {
        const homeServiceInstance = new HomeService(Post);
        const data = await homeServiceInstance.getMainPage();
        SuccessResponse(res, sc.OK, rm.READ_ALL_POSTS_SUCCESS, data);
    } catch (error) {
        console.log(error);
        ErrorResponse(res, sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR);
    }
}

const homeController = {
    getMainPage,
};

export default homeController;