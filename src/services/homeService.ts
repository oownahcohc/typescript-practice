import { Service } from "typedi";

@Service()
class HomeService {
    constructor(
        private postModel,
        private postLikeModel,
        private postDisLikeModel,
        private commentModel
    ) {}

    public async getMainPage() {
        try {
            const home = await this.postModel.findAll({ order: [["createdAt", "DESC"]], });

        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}