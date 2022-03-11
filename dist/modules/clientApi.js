"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NaverAuthAPI = void 0;
const axios_1 = __importDefault(require("axios"));
const NaverAuthAPI = (naverAccessToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apiUrl = `https://openapi.naver.com/v1/nid/me`;
        const userData = yield (0, axios_1.default)(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${naverAccessToken}`,
            }
        });
        const naverUser = userData.data.response;
        return naverUser;
    }
    catch (error) {
        console.error("❌ Cannot find Naver User: ", error);
        throw new Error(error);
    }
});
exports.NaverAuthAPI = NaverAuthAPI;
//# sourceMappingURL=clientApi.js.map