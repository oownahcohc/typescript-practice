import { Service } from "typedi";
import { SeePostResponse } from "../../interface/dto/response/postResponse";
import { ISeePostDTO, IUser, UploadDTO } from "../../interface/dto/request/postRequest";
import { Comment, PostDisLike, PostLike } from "../../models";
import Error from "../../constant/responseError";
import { CommonService } from "../../interface/common";

@Service()
class PostService implements CommonService {
    constructor(private postModel) {}
    
    public async postUpload (userUploadDto: UploadDTO, userId: IUser) {
        if (!userUploadDto.title || !userUploadDto.myStory || !userId) {
            return Error.NULL_VALUE;
        }
        try {
            const post = await this.postModel.create({ ...userUploadDto, userId });
            return { post };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    
    
    public async seePost (seePostDto: ISeePostDTO): Promise<SeePostResponse> {
        if (!seePostDto.postId || !seePostDto.userId) {
            return Error.NULL_VALUE;
        }
        try {
            let post = await this.postModel.findOne({ 
                where: { 
                    id: seePostDto.postId,
                    userId: seePostDto.userId
                },
                include: [{
                    model: Comment
                }, {
                    model: PostLike
                }, {
                    model: PostDisLike
                }]
            });
            if (!post) return Error.DB_NOT_FOUND;
            post["dataValues"].countComment = await this.countComment(seePostDto);
            return { post };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    public async countComment(seePostDto: ISeePostDTO): Promise<number> {
        try {
            // const postResponse = await this.seePost(seePostDto); // 여기서 무한루프 병신아 ㅋㅋ
            const postResponse = await this.postModel.findOne({ 
                where: { 
                    id: seePostDto.postId,
                    userId: seePostDto.userId
                },
                include: [{
                    model: Comment
                }]
            });
            if ("comments" in postResponse["dataValues"]) {
                const countOfComment = postResponse["dataValues"].comments.length;
                return countOfComment;
            } else {
                return Error.DB_NOT_FOUND;
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
        //throw new Error("Method not implemented.");
    }
}

export default PostService;