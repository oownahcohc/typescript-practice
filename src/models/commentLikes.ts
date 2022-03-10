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
import Comment from "./comments";
import User from "./users";

@Table({ // 테이블 설정
    modelName: "CommentLike",
    tableName: "commentLikes",
    freezeTableName: true,
    underscored: false,
    paranoid: false,
    timestamps: true,
    charset: "utf8", // 한국어 설정
    collate: "utf8_general_ci", // 한국어 설정
})

export default class CommentLike extends Model { // 모델 설정
    @PrimaryKey
    @AutoIncrement
    @Unique
    @Column
    id!: number;

    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    userId!: number;

    @ForeignKey(() => Comment)
    @Column(DataType.INTEGER)
    commentId!: number;

    @Default(false)
    @Column(DataType.BOOLEAN)
    isLiked!: boolean;

    @BelongsTo(() => Comment)
    comment!: Comment;

    @BelongsTo(() => User)
    user!: User;
}
