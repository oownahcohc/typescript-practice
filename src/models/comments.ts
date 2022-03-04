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
import CommentDislike from "./commentDislikes";
import CommentLike from "./commentLikes";
import Post from "./posts";
import User from "./users";

@Table({ // 테이블 설정
    modelName: "Comment",
    tableName: "comments",
    freezeTableName: true,
    underscored: false,
    paranoid: false,
    timestamps: true,
    charset: "utf8", // 한국어 설정
    collate: "utf8_general_ci", // 한국어 설정
})

export default class Comment extends Model { // 모델 설정
    @PrimaryKey
    @AutoIncrement
    @Unique
    @Column
    id: number;

    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    userId: number;

    @AllowNull(true)
    @ForeignKey(() => Post)
    @Column(DataType.INTEGER)
    postId: number;

    @AllowNull(true)
    @Column(DataType.INTEGER)
    commentGroupId: number;

    @AllowNull(true)
    @Column(DataType.INTEGER)
    depth: number;

    @Default(false)
    @Column(DataType.BOOLEAN)
    isDeleted: boolean;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Post)
    post: Post

    @HasMany(() => CommentLike)
    commentLikes!: CommentLike[];

    @HasMany(() => CommentDislike)
    commentDislikes!: CommentDislike[];
}
