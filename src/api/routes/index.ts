import { Router } from "express";
import authRouter from "./authRouter";
import homeRouter from "./homeRouter";
import postRouter from "./postRouter";

const router = Router();

router.use("/auth", authRouter);
router.use("/home", homeRouter);
router.use("/post", postRouter);

export default router;