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
const comments_1 = __importDefault(require("./comments"));
const postDislikes_1 = __importDefault(require("./postDislikes"));
const postLikes_1 = __importDefault(require("./postLikes"));
const users_1 = __importDefault(require("./users"));
let Post = class Post extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Unique,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Post.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => users_1.default),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Post.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(50)),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Post.prototype, "myStory", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.STRING)),
    __metadata("design:type", Array)
], Post.prototype, "imageUrl", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", Boolean)
], Post.prototype, "isDeleted", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => users_1.default),
    __metadata("design:type", users_1.default)
], Post.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => comments_1.default),
    __metadata("design:type", Array)
], Post.prototype, "comments", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => postLikes_1.default),
    __metadata("design:type", Array)
], Post.prototype, "postLikes", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => postDislikes_1.default),
    __metadata("design:type", Array)
], Post.prototype, "postDislikes", void 0);
Post = __decorate([
    (0, sequelize_typescript_1.Table)({
        modelName: "Post",
        tableName: "posts",
        freezeTableName: true,
        underscored: false,
        paranoid: false,
        timestamps: true,
        charset: "utf8",
        collate: "utf8_general_ci", // 한국어 설정
    })
], Post);
exports.default = Post;
//# sourceMappingURL=posts.js.map