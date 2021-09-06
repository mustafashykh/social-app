import express, { Application, Request, Response } from 'express';
import 'module-alias/register';
import * as http from 'http';
import dotenv from 'dotenv';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import { setup } from './graphql';
import { setup as dbSetup } from './db';

dotenv.config();

const app: Application = express();
const server: http.Server = http.createServer(app);

// here we are adding middleware to parse all incoming requests as JSON 
app.use(express.json());

// here we are adding middleware to allow cross-origin requests
app.use(cors());

// here we are preparing the expressWinston logging middleware configuration,
// which will automatically log all HTTP requests handled by Express.js
const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
      winston.format.json(),
      winston.format.prettyPrint(),
      winston.format.colorize({ all: true })
    ),
};

if (!process.env.DEBUG) {
  loggerOptions.meta = false; // when not debugging, log requests as one-liners
}

// initialize the logger with the above configuration
app.use(expressWinston.logger(loggerOptions));


// this is a simple route to make sure everything is working properly
const runningMessage = `<h1>Server running at http://localhost:${4000}</h1>`;
app.get('/', (req: Request, res: Response) => {
  res.status(200).send(runningMessage)
});


( async () => {
  try {
    await dbSetup();
    await setup(app, server);
  } catch (error) {
    console.log(`[SERVER_EXCEPTION]`, error);
  }
})()

