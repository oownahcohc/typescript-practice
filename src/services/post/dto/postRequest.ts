interface UploadDTO  {
    readonly title?: string;
    readonly myStory?: string;
    readonly imgUrl?: string[];
};

interface ISeePostDTO {
    readonly userId?: number;
    readonly postId?: number;
}

type IUser = number;


export {
    UploadDTO,
    ISeePostDTO,
    IUser,
}