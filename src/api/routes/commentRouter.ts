import { Router } from "express";
import commentController from "../controllers/commentController";

const router = Router();

router.post("/post-comment/:postId/:userId", commentController.postCommentOnPost);
router.post("/nested-comment", );

export default router;