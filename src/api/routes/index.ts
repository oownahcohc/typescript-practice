import { Router } from "express";
import authRouter from "./authRouter";
import homeRouter from "./homeRouter";
import postRouter from "./postRouter";
import commentRouter from "./commentRouter";
import authUtil from "../middlewares/auth";

const router = Router();

router.use("/auth", authRouter);
router.use("/home", homeRouter);
router.use(authUtil.isAuth);
router.use("/post", postRouter);
router.use("/comment", commentRouter);

export default router;