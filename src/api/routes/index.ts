import { Router } from "express";
import authRouter from "./authRouter";
import homeRouter from "./homeRouter";

const router = Router();

router.use("/auth", authRouter);
router.use("/home", homeRouter);

export default router;