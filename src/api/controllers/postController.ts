import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../../modules/apiResponse";
import { ISeePostDTO, IUser, UploadDTO } from "@/services/post/dto/postRequest";
import sc from "../../constant/resultCode";
import rm from "../../constant/resultMessage";
import PostService from "../../services/post/postService";
import { Post } from "../../models";
import Error from "../../constant/responseError";

const postUpload = async (req: Request, res: Response) => {
    const uploadDto = req.body as UploadDTO;
    const { id: userId } = req.user;
    //const userUploadDto = Object.assign(userId, uploadDto)  as IUser;
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

const seeMyPost = async (req: Request, res: Response) => {
    const seeMyPostDto = req.params as ISeePostDTO;
    const { id: userId } = req.user;
    //const seeMyPostDto = Object.assign(userId, postId) as IUser;
    try {
        const postServiceInstance = new PostService(Post);
        const data = await postServiceInstance.seeMyPost(seeMyPostDto, userId);
        SuccessResponse(res, sc.OK, rm.READ_ONE_POST_SUCCESS, data);
    } catch (error) {
        console.log(error);
        ErrorResponse(res, sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR);
    }
}

const seeOtherPost = async (req: Request, res: Response) => {
    const seeOtherPostDto = req.params as ISeePostDTO;
    try {
        const postServiceInstance = new PostService(Post);
        const data = await postServiceInstance.seeOtherPost(seeOtherPostDto);
        SuccessResponse(res, sc.OK, rm.READ_ONE_POST_SUCCESS, data);
    } catch (error) {
        console.log(error);
        ErrorResponse(res, sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR);
    }
}

const postController = {
    postUpload,
    seeMyPost,
    seeOtherPost,
};

export default postController;