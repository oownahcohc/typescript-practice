import { Sequelize } from "sequelize-typescript";
import dbConfig from "../config/dbConfig"
import Chat from "./chats";
import CommentDislike from "./commentDislikes";
import CommentLike from "./commentLikes";
import Comment from "./comments";
import PostDisLike from "./postDislikes";
import PostLike from "./postLikes";
import Post from "./posts";
import Room from "./rooms";
import User from "./users";

const sequelize = new Sequelize({
  host: dbConfig.development.host,
  database: dbConfig.development.database,
  username: dbConfig.development.username,
  password: dbConfig.development.password,
  dialect: "postgres",
  logging: false,
  timezone: "+09:00",
});

sequelize.addModels([
  User,
  Post,
  Comment,
  PostLike,
  PostDisLike,
  CommentLike,
  CommentDislike,
  Room,
  Chat,
]);

export {   
  User,
  Post,
  Comment,
  PostLike,
  PostDisLike,
  CommentLike,
  CommentDislike,
  Room,
  Chat
};

export default sequelize;