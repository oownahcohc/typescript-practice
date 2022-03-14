import Error from "../../constant/responseError";
import { Comment, PostDisLike, PostLike } from "../../models";
import { Service } from "typedi";

@Service()
class HomeService {
    constructor(
        private postModel
    ) {}

    public async getMainPage() {
        try {
            const home = await this.postModel.findAll({ 
                order: [["createdAt", "DESC"]],
                include: [{
                    model: Comment
                }, {
                    model: PostLike
                }, {
                    model: PostDisLike
                }]
            });
            if (!home) return Error.DB_NOT_FOUND;
            return { home };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default HomeService;