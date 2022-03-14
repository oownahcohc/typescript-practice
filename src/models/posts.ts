import { 
    AllowNull, 
    AutoIncrement, 
    BelongsTo, 
    Column, 
    DataType, 
    Default, 
    ForeignKey, 
    HasMany, 
    Model, 
    PrimaryKey, 
    Table, 
    Unique } from "sequelize-typescript"
import Comment from "./comments";
import PostDisLike from "./postDislikes";
import PostLike from "./postLikes";
import User from "./users";


@Table({
    modelName: "Post",
    tableName: "posts",
    freezeTableName: true,
    underscored: false,
    paranoid: false,
    timestamps: true,
    charset: "utf8", // 한국어 설정
    collate: "utf8_general_ci", // 한국어 설정
})

export default class Post extends Model {
    @PrimaryKey
    @AutoIncrement
    @Unique
    @Column(DataType.INTEGER)
    id!: number;

    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    userId!: number;

    @AllowNull(false)
    @Column(DataType.STRING(50))
    title!: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    myStory!: string;

    @AllowNull(true)
    @Column(DataType.ARRAY(DataType.STRING))
    imageUrl?: string[];

    @Default(false)
    @Column(DataType.BOOLEAN)
    isDeleted!: boolean;  

    @BelongsTo(() => User)
    user!: User

    @HasMany(() => Comment)
    comments!: Comment[];

    @HasMany(() => PostLike)
    postLikes!: PostLike[];

    @HasMany(() => PostDisLike)
    postDislikes!: PostDisLike[];
}
