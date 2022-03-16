import { CommentDTO } from "../../interface/dto/request/commentRequest";
import { IUser } from "../../interface/dto/request/postRequest";
import Error from "../../constant/responseError";
import { ErrorResponse } from "../../interface/dto/response/authResponse";
import { CommonService } from "@/interface/common";

class CommentService implements CommonService {
    constructor(private readonly commentModel) {}

    public async postCommentOnPost (
        commentDto: CommentDTO, 
        commenterId: IUser // 게시물에 댓글을 남기는 놈 => 나!!!
    ): Promise<ErrorResponse | void> {
        try {
            let countComment = await this.countComment(commentDto);
            const commentGroupId = ++countComment;
            const comment = await this.commentModel.create({
                ...commentDto,
                userId: commenterId,
                commentGroupId
            });
            if (!comment) return Error.DB_NOT_FOUND;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async countComment (commentDto: CommentDTO): Promise<number>  {
        try {
            let commentNumber = await this.commentModel.count({ 
                where: { 
                    postId: commentDto.postId 
                } 
            });
            return commentNumber;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default CommentService;