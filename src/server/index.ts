import 'dotenv/config'; 
import express from 'express';
import httpErrors from 'http-errors';
import rootRouter from './routes/roots';
import { timeMiddleware } from './middleware/time';
import * as path from "path";
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import * as config from '.'

import { configureSession } from './config';
// …





const app = express();
const PORT = process.env.PORT || 3000;


app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use(timeMiddleware);
app.use(express.static(path.join(process.cwd(),"public")));
app.set('views', path.join(process.cwd(), 'src', 'server', 'views'));
app.set('view engine', 'ejs');
configureSession(app);
app.use('/', rootRouter);
app.use('/test',rootRouter);

app.use((_request,_response,next) => {
  next(httpErrors(404));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




// …other exports
