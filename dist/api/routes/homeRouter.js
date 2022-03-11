"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const homeController_1 = __importDefault(require("../controllers/homeController"));
const router = (0, express_1.Router)();
router.get("/", homeController_1.default.getMainPage);
exports.default = router;
//# sourceMappingURL=homeRouter.js.map