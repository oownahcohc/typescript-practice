import { 
    AllowNull,
    AutoIncrement, 
    BelongsTo, 
    Column, 
    DataType, 
    ForeignKey, 
    Model, 
    PrimaryKey, 
    Table, 
    Unique } from "sequelize-typescript"
import User from "./users";


@Table({
    modelName: "Room",
    tableName: "rooms",
    freezeTableName: true,
    underscored: false,
    paranoid: false,
    timestamps: true,
    charset: "utf8", // 한국어 설정
    collate: "utf8_general_ci", // 한국어 설정
})

export default class Room extends Model {
    @PrimaryKey
    @AutoIncrement
    @Unique
    @Column
    id!: number;
    
    // 방장 아이디
    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    userId!: number

    @AllowNull(true)
    @Column(DataType.STRING(50))
    roomTitle!: string;

    @BelongsTo(() => User)
    user!: User
}
