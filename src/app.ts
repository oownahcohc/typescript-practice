import "reflect-metadata" // 데코레이터 사용을 위한 참조
import express from "express"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import cors from "cors";
import apiRouter from "./api/routes"
import { connectDB } from "./loaders/db";

function startServer() {
    const app = express();
    const logger = morgan('dev') // 개발 단계 morgan 사용 -> 차후 winston 적용하기
    /**
    * A little hack here
    * Import/Export can only be used in 'top-level code'
    * Well, at least in node 10 without babel and at the time of writing
    * So we are using good old require.
    */

    /**DB 관련 */
    connectDB();

    app.use(cors());
    app.use(logger);
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    // 라우팅
    app.use("/api", apiRouter);
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
        🛡️  Server listening on port 🛡️
        ################################################
      `);
    })
    .on("error", err => {
        console.error(err);
        process.exit(1);
    });
}

startServer();