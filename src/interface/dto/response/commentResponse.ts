import { ErrorResponse } from "@/interface/dto/response/authResponse";
import { ISeePostDTO } from "@/interface/dto/request/postRequest";

type CommentResponse = ErrorResponse | Comment

interface Comment extends ISeePostDTO {
    readonly countComment?: number;
}

export {
    CommentResponse,
}