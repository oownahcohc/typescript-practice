import Error from "../../constant/responseError";
import { Service } from "typedi";
import { ISeePostDTO, IUser, UploadDTO } from "./dto/postRequest";
import { Comment, PostDisLike, PostLike } from "../../models";

@Service()
class PostService {
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

   public async seeMyPost (seeMyPostDto: ISeePostDTO, userId: IUser) {
        try {
            const post = await this.postModel.findOne({ 
                where: { 
                    id: seeMyPostDto.postId, 
                    userId,
                },
                include: [{
                    model: Comment
                }, {
                    model: PostLike
                }, {
                    model: PostDisLike
                }]
            });
            return { post };
        } catch (error) {
            console.log(error);
            throw error;
        }
   }

   public async seeOtherPost (seeOtherPostDto: ISeePostDTO) {
    try {
        const post = await this.postModel.findOne({ 
            where: { 
                id: seeOtherPostDto.postId, 
                userId: seeOtherPostDto.userId
            },
            include: [{
                model: Comment
            }, {
                model: PostLike
            }, {
                model: PostDisLike
            }]
        });
        return { post };
    } catch (error) {
        console.log(error);
        throw error;
    }
   }
}

export default PostService;