import express, {
  Request,
  Response,
  NextFunction,
  Application,
  ErrorRequestHandler,
} from 'express';
import { Server } from 'http';
import createHttpError from 'http-errors';
import { config } from 'dotenv';

config();

const app: Application = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello from typescript app!');
});

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new createHttpError.NotFound());
});

const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
};

app.use(errorHandler);

const PORT: Number = Number(process.env.PORT) || 4000;

const server: Server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
