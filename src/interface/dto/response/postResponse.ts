import { ErrorResponse } from "@/interface/dto/response/authResponse";
import { Comment, PostDisLike, PostLike } from "../../../models";

export type SeePostResponse = ErrorResponse | PostResponse;

interface PostResponse {
    readonly post?: Post;
} 

type Post = {
    readonly id: number;
    readonly userId: number;
    readonly title: string;
    readonly myStory: string;
    readonly imageUrl?: string[];
    readonly commentCount?: number;
    readonly isDeleted: boolean;
    readonly comments?: Comment[];
    readonly postLikes?: PostLike[];
    readonly postDislikes?: PostDisLike[];
}

