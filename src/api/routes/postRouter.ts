import { Router } from "express";
import postController from "../controllers/postController";
import authUtil from "../middlewares/auth";

const router = Router();

router.use(authUtil.isAuth);
router.post("/upload", postController.postUpload);
router.get("/see/:postId", postController.seeMyPost);
router.get("/see/:postId/:userId", postController.seeOtherPost);
router.patch("/edit/:postId", );
router.delete("/remove/:postId", );

export default router;