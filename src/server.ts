import exp from 'constants';
import express, {Request, Response, NextFunction} from 'express';
 
const app = express();

function loggerMiddleware(request: Request, response: Response, next: NextFunction): void {
  console.log(`${request.method} ${request.path} ${request.ip}`);
  next();
}

app.use(express.json());  // body parser -> request body eléréséhez
app.use(loggerMiddleware);
 
app.get('/', (req: Request, res: Response) => {
  res.send(req.body);
});
 
app.listen(5000);