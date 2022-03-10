import { 
    AllowNull, 
    AutoIncrement, 
    Column, 
    DataType, 
    Default, 
    HasMany, 
    IsEmail, 
    Model, 
    PrimaryKey, 
    Table, 
    Unique } from "sequelize-typescript"
import CommentDislike from "./commentDislikes";
import CommentLike from "./commentLikes";
import Comment from "./comments";
import PostDisLike from "./postDislikes";
import PostLike from "./postLikes";
import Post from "./posts";
import Room from "./rooms";


@Table({
    modelName: "User",
    tableName: "users",
    freezeTableName: true,
    underscored: false,
    paranoid: false,
    timestamps: true,
    charset: "utf8", // 한국어 설정
    collate: "utf8_general_ci", // 한국어 설정
})

export default class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Unique
    @Column(DataType.INTEGER)
    public readonly id!: number;

    @Default("local")
    @Column(DataType.STRING(10))
    public social!: string;

    @AllowNull(true)
    @IsEmail
    @Column(DataType.STRING(30))
    public email!: string;

    @AllowNull(false)
    @Column(DataType.STRING(100))
    public password!: string;

    @Unique
    @AllowNull(false)
    @Column(DataType.STRING(30))
    public nickname!: string;

    @AllowNull(true)
    @Column(DataType.TEXT)
    public token!: string;   

    @HasMany(() => Comment)
    comments!: Comment[];

    @HasMany(() => Post)
    posts!: Post[];

    @HasMany(() => Room)
    rooms!: Room[];

    @HasMany(() => PostLike)
    postLikes!: PostLike[];

    @HasMany(() => PostDisLike)
    postDislikes!: PostDisLike[];

    @HasMany(() => CommentLike)
    commentLikes!: CommentLike[];

    @HasMany(() => CommentDislike)
    commentDislikes!: CommentDislike[];
}
