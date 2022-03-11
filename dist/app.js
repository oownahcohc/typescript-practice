"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); // 데코레이터 사용을 위한 참조
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./api/routes"));
const db_1 = require("./loaders/db");
function startServer() {
    const app = (0, express_1.default)();
    const logger = (0, morgan_1.default)('dev'); // 개발 단계 morgan 사용 -> 차후 winston 적용하기
    /**
    * A little hack here
    * Import/Export can only be used in 'top-level code'
    * Well, at least in node 10 without babel and at the time of writing
    * So we are using good old require.
    */
    /**DB 관련 */
    (0, db_1.connectDB)();
    app.use((0, cors_1.default)());
    app.use(logger);
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cookie_parser_1.default)());
    // 라우팅
    app.use("/api", routes_1.default);
    //  route 폴더에 우리가 지정할 경로가 아닌 다른 경로로 요청이 올 경우,
    //  잘못된 경로로 요청이 들어왔다는 메시지를 클라이언트에 보냄
    app.use("*", (req, res) => {
        res.status(404).json({
            status: 404,
            success: false,
            message: "잘못된 경로입니다.",
        });
    });
    app.listen(process.env.PORT, () => {
        console.log(`
        ################################################
        🛡️  Server listening on port: http://localhost:3000 🛡️
        ################################################
      `);
    })
        .on("error", err => {
        console.error(err);
        process.exit(1);
    });
}
startServer();
//# sourceMappingURL=app.js.map