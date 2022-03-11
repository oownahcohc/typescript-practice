"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controllers/authController"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = (0, express_1.Router)();
router.post("/signup", authController_1.default.signup);
router.post("/login", authController_1.default.login);
router.get("/logout", auth_1.default.isAuth, authController_1.default.logout);
router.get("/reissue-token", authController_1.default.reissueToken);
router.post("/:social/login", authController_1.default.socialLogin);
exports.default = router;
//# sourceMappingURL=authRouter.js.map