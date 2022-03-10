import { Router } from "express";
import homeController from "../controllers/homeController";

const router = Router();

router.get("/", homeController.getMainPage);

export default router;