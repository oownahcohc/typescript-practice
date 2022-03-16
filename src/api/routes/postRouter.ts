import { Router } from "express";
import postController from "../controllers/postController";

const router = Router();

router.post("/upload", postController.postUpload);
router.get("/see/:postId/:userId", postController.seePost);
router.patch("/edit/:postId", );
router.delete("/remove/:postId", );

export default router;