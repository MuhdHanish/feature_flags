import chalk from "chalk";
import { app } from "./app";

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`${chalk.green.bold(`\n  EXPRESS`)} ${chalk.green(`v4.21.1\n`)}`);
    console.log(`${chalk.green('  ➜')} ${chalk.white.bold(` Local:  `)} ${chalk.cyan(`http://localhost:${chalk.cyanBright.bold(PORT)}/`)}\n`);
});