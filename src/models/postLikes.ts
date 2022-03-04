import { 
    AutoIncrement, 
    BelongsTo, 
    Column, 
    DataType, 
    Default, 
    ForeignKey, 
    Model, 
    PrimaryKey, 
    Table, 
    Unique } from "sequelize-typescript"
import Post from "./posts";
import User from "./users";


@Table({
    modelName: "PostLike",
    tableName: "postLikes",
    freezeTableName: true,
    underscored: false,
    paranoid: false,
    timestamps: true,
    charset: "utf8", // 한국어 설정
    collate: "utf8_general_ci", // 한국어 설정
})

export default class PostLike extends Model {
    @PrimaryKey
    @AutoIncrement
    @Unique
    @Column(DataType.INTEGER)
    id: number;

    @ForeignKey(() => Post)
    @Column(DataType.INTEGER)
    postId: number;

    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    userId: number;

    @Default(false)
    @Column(DataType.BOOLEAN)
    isLiked: boolean;

    @BelongsTo(() => Post)
    post: Post;

    @BelongsTo(() => User)
    user: User;
}
