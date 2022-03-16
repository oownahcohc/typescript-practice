import assert from "assert";
import { Comment } from "../../src/models";
import CommentService from "../../src/services/comment/commentService"
import { CommentDTO } from "../../src/services/comment/dto/commentRequest";

describe("/api/comment", () => {
    const commentServiceInstance = new CommentService(Comment);
    let testComment: CommentDTO;

    describe("[POST] /post-comment/:postId=2", () => {
        it("")
    })
})