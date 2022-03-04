import { 
    AllowNull, 
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
import Room from "./rooms";


@Table({
    modelName: "Chat",
    tableName: "chats",
    freezeTableName: true,
    underscored: false,
    paranoid: false,
    timestamps: true,
    charset: "utf8", // 한국어 설정
    collate: "utf8_general_ci", // 한국어 설정
})

export default class Chat extends Model {
    @PrimaryKey
    @AutoIncrement
    @Unique
    @Column(DataType.INTEGER)
    id: number;

    // 어떤 채팅방인지 구분
    @AllowNull(false)
    @ForeignKey(() => Room)
    @Column(DataType.INTEGER)
    roomId: number;

    // 채팅 날린 유저의 아이디
    @AllowNull(false)
    @Column(DataType.INTEGER)
    userId: number;

    // 유저가 채팅 날린거 => ex) 뭐해?
    @Column(DataType.STRING)
    chat: string;

    @AllowNull(true)
    @Column(DataType.ARRAY(DataType.STRING))
    images: string[];

    @Default(false)
    @Column(DataType.BOOLEAN)
    isDeleted: boolean;  

    @BelongsTo(() => Room)
    room: Room

}
