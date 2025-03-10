import express from "express";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import { authRouter } from "../routes/auth.js";
import { errorMiddleware } from "../middleware/error-middleware.js"
import { publicRouter } from "../routes/public.js";
import { leaderRouter } from "../routes/leader.js";
import { treasuryRouter } from "../routes/treasury.js";
import { adminRouter } from "../routes/administrator.js";
import { midtransRouter } from "../routes/midtrans.js";

dotenv.config();
export const web = express.Router();

web.use(cookieParser());
web.use(express.json({ limit: '100mb' }));

// Body parser middleware
web.use(bodyParser.json({ limit: '100mb' }));
web.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

// api
web.use(authRouter);
web.use(publicRouter);
web.use(leaderRouter);
web.use(treasuryRouter);
web.use(adminRouter);
web.use(midtransRouter);

// Error middleware harus selalu di akhir
web.use(errorMiddleware);