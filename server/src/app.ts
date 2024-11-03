import cors from "cors";
import { config } from "dotenv";
import { CustomError } from "./utils";
import { errorHandler } from "./middlewares";
import express, { NextFunction, Request, Response } from "express";
import { flagsConfig } from "./config";

config();

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET"],
        allowedHeaders: ["Content-Type", "Authorization"],
        optionsSuccessStatus: 204,
        maxAge: 86400
    })
);

app.get('/', (_req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({
            status: 'success',
            message: 'Server is running'
        });
    } catch (error) {
        next(error);
    }
});

app.get(`/api/feature-flags/:env/:project`, (req: Request, res: Response, next: NextFunction) => {
    try {
        const { env, project } = req.params;
        if (!env || !project) {
            throw new CustomError('Environment and project parameters are required.', 400);
        }
        const flags = flagsConfig[env as 'development' | 'production']?.[project];
        if (flags) {
            res.json({ status: 'success', flags });
        } else {
            throw new CustomError('Feature flags not found.', 404);
        }
    } catch (error) {
        next(error);
    }
});

app.use("*", (_req: Request, _res: Response, next: NextFunction) => {
    next(new CustomError('Resource not found', 404));
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, req, res, next);
});

export { app };