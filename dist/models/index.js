"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = exports.Room = exports.CommentDislike = exports.CommentLike = exports.PostDisLike = exports.PostLike = exports.Comment = exports.Post = exports.User = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
const chats_1 = __importDefault(require("./chats"));
exports.Chat = chats_1.default;
const commentDislikes_1 = __importDefault(require("./commentDislikes"));
exports.CommentDislike = commentDislikes_1.default;
const commentLikes_1 = __importDefault(require("./commentLikes"));
exports.CommentLike = commentLikes_1.default;
const comments_1 = __importDefault(require("./comments"));
exports.Comment = comments_1.default;
const postDislikes_1 = __importDefault(require("./postDislikes"));
exports.PostDisLike = postDislikes_1.default;
const postLikes_1 = __importDefault(require("./postLikes"));
exports.PostLike = postLikes_1.default;
const posts_1 = __importDefault(require("./posts"));
exports.Post = posts_1.default;
const rooms_1 = __importDefault(require("./rooms"));
exports.Room = rooms_1.default;
const users_1 = __importDefault(require("./users"));
exports.User = users_1.default;
const sequelize = new sequelize_typescript_1.Sequelize({
    host: dbConfig_1.default.development.host,
    database: dbConfig_1.default.development.database,
    username: dbConfig_1.default.development.username,
    password: dbConfig_1.default.development.password,
    dialect: "postgres",
    logging: false,
    timezone: "+09:00",
});
sequelize.addModels([
    users_1.default,
    posts_1.default,
    comments_1.default,
    postLikes_1.default,
    postDislikes_1.default,
    commentLikes_1.default,
    commentDislikes_1.default,
    rooms_1.default,
    chats_1.default,
]);
exports.default = sequelize;
//# sourceMappingURL=index.js.map