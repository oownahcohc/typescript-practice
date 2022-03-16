import { ISeePostDTO } from "./postRequest";

interface CommentDTO extends ISeePostDTO {
    readonly comment?: string;
}



export {
    CommentDTO,
}