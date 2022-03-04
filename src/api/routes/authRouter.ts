import { Router } from "express";
import authController from "../controllers/authController";
import authUtil from "../middlewares/auth";

const router = Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authUtil.isAuth, authController.logout);
router.get("/reissue-token", authController.reissueToken);
router.post("/:social/login", authController.socialLogin);

export default router;