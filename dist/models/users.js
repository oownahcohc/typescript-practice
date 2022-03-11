"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const commentDislikes_1 = __importDefault(require("./commentDislikes"));
const commentLikes_1 = __importDefault(require("./commentLikes"));
const comments_1 = __importDefault(require("./comments"));
const postDislikes_1 = __importDefault(require("./postDislikes"));
const postLikes_1 = __importDefault(require("./postLikes"));
const posts_1 = __importDefault(require("./posts"));
const rooms_1 = __importDefault(require("./rooms"));
let User = class User extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Unique,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)("local"),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(10)),
    __metadata("design:type", String)
], User.prototype, "social", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    sequelize_typescript_1.IsEmail,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(30)),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(100)),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(30)),
    __metadata("design:type", String)
], User.prototype, "nickname", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], User.prototype, "token", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => comments_1.default),
    __metadata("design:type", Array)
], User.prototype, "comments", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => posts_1.default),
    __metadata("design:type", Array)
], User.prototype, "posts", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => rooms_1.default),
    __metadata("design:type", Array)
], User.prototype, "rooms", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => postLikes_1.default),
    __metadata("design:type", Array)
], User.prototype, "postLikes", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => postDislikes_1.default),
    __metadata("design:type", Array)
], User.prototype, "postDislikes", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => commentLikes_1.default),
    __metadata("design:type", Array)
], User.prototype, "commentLikes", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => commentDislikes_1.default),
    __metadata("design:type", Array)
], User.prototype, "commentDislikes", void 0);
User = __decorate([
    (0, sequelize_typescript_1.Table)({
        modelName: "User",
        tableName: "users",
        freezeTableName: true,
        underscored: false,
        paranoid: false,
        timestamps: true,
        charset: "utf8",
        collate: "utf8_general_ci", // 한국어 설정
    })
], User);
exports.default = User;
//# sourceMappingURL=users.js.map