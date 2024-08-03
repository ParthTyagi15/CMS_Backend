import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";

const app = express();
config({ path: "./config/config.env" });

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","https://cms-frontend1.onrender.com");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type,Accept"
  );
  next();
  });

app.use(
  cors({
    origin: [`https://cms-frontend1.onrender.com`, `https://cms-admin-g1uw.onrender.com`,`http://localhost:5173`, process.env.FRONTEND_URL, process.env.DASHBOARD_URL, "Allow-Control-Allow-Origin"],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization ", "Allow-Control-Allow-Origin", "Access-Control-Allow-Credentials", "Access-Control-Allow-Headers"],
  }),
);
console.log(process.env.FRONTEND_URL);
console.log(process.env.DASHBOARD_URL);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

dbConnection();

app.use(errorMiddleware);
export default app;
