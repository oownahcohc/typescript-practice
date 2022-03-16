import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../../modules/apiResponse";
import { ISeePostDTO, IUser, UploadDTO } from "@/interface/dto/request/postRequest";
import sc from "../../constant/resultCode";
import rm from "../../constant/resultMessage";
import Error from "../../constant/responseError";
import PostService from "../../services/post/postService";
import { Post } from "../../models";

const postUpload = async (req: Request, res: Response) => {
    const uploadDto = req.body as UploadDTO;
    const { id: userId } = req.user;
    try {
        const postServiceInstance = new PostService(Post);
        const data = await postServiceInstance.postUpload(uploadDto, userId);
        if (data === Error.NULL_VALUE) {
            return ErrorResponse(res, sc.BAD_REQUEST, rm.NULL_VALUE);
        }
        SuccessResponse(res, sc.CREATED, rm.ADD_ONE_POST_SUCCESS, data);
    } catch (error) {
        console.log(error);
        ErrorResponse(res, sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR);
    }
};


const seePost = async (req: Request, res: Response) => {
    const seePostDto = req.params as ISeePostDTO;
    try {
        const postServiceInstance = new PostService(Post);
        const data = await postServiceInstance.seePost(seePostDto);
        if (data === Error.NULL_VALUE) {
            return ErrorResponse(res, sc.BAD_REQUEST, rm.NULL_VALUE);
        }
        if (data === Error.DB_NOT_FOUND) {
            return ErrorResponse(res, sc.BAD_REQUEST, rm.NO_POST);
        }
        SuccessResponse(res, sc.OK, rm.READ_ONE_POST_SUCCESS, data);
    } catch (error) {
        console.log(error);
        ErrorResponse(res, sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR);
    }
}

const postController = {
    postUpload,
    seePost,
};

export default postController;