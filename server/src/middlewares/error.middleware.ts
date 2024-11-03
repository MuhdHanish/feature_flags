import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils";
import chalk from "chalk";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    _next: NextFunction 
) => {
    let status = 500;
    let message = 'Internal server error';

    if (err instanceof CustomError) {
        status = err.status;
        message = err.message;
    }

    console.error(
        `${chalk.redBright.bold('[ERROR]')} ${chalk.blueBright(req.method)} ${chalk.cyanBright(req.path)} - ${chalk.yellowBright(`Status: ${status}`)} - ${chalk.whiteBright(message)}\n` +
        `${chalk.greenBright.bold('[Stack Trace]')} ${chalk.gray(err.stack?.split('\n')[1]?.trim() || 'N/A')}`
    );

    return res.status(status).json({
        status: 'error',
        message: message
    });
};
