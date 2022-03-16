import { Request, Response } from "express";
import sc from "../../constant/resultCode";
import rm from "../../constant/resultMessage";
import Error from "../../constant/responseError";
import { ErrorResponse, SuccessResponse } from "../../modules/apiResponse";
import { CommentDTO } from "../../interface/dto/request/commentRequest";
import CommentService from "../../services/comment/commentService";
import { Comment, Post } from "../../models";
import PostService from "../../services/post/postService";

const postCommentOnPost = async (req: Request, res: Response) => {
    const { id: commenterId } = req.user; // 얘는 댓글 달 유저 => 나!!
    const commentDto = Object.assign(req.params, req.body) as CommentDTO;
    
    try {
        const commentServiceInstance = new CommentService(Comment);
        const responseData = await commentServiceInstance.postCommentOnPost(commentDto, commenterId);

        if (responseData === Error.DB_NOT_FOUND) {
            return ErrorResponse(res, sc.BAD_REQUEST, rm.NO_POST);
        } else {
            const postServiceInstance = new PostService(Post);
            const data = await postServiceInstance.seePost(commentDto);
            console.log("🚀🚀data", data);
            return SuccessResponse(res, sc.CREATED, rm.ADD_COMMENT_SUCCESS, data);
        }
    } catch (error) {
        console.log(error);
        ErrorResponse(res, sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR);
    }
}


const commentController = {
    postCommentOnPost,
};

export default commentController;