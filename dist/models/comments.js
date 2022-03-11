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
const posts_1 = __importDefault(require("./posts"));
const users_1 = __importDefault(require("./users"));
let Comment = class Comment extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Comment.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => users_1.default),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Comment.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.ForeignKey)(() => posts_1.default),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Comment.prototype, "postId", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Comment.prototype, "commentGroupId", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Comment.prototype, "depth", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(false),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", Boolean)
], Comment.prototype, "isDeleted", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => users_1.default),
    __metadata("design:type", users_1.default)
], Comment.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => posts_1.default),
    __metadata("design:type", posts_1.default)
], Comment.prototype, "post", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => commentLikes_1.default),
    __metadata("design:type", Array)
], Comment.prototype, "commentLikes", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => commentDislikes_1.default),
    __metadata("design:type", Array)
], Comment.prototype, "commentDislikes", void 0);
Comment = __decorate([
    (0, sequelize_typescript_1.Table)({
        modelName: "Comment",
        tableName: "comments",
        freezeTableName: true,
        underscored: false,
        paranoid: false,
        timestamps: true,
        charset: "utf8",
        collate: "utf8_general_ci", // 한국어 설정
    })
], Comment);
exports.default = Comment;
//# sourceMappingURL=comments.js.map