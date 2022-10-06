import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import { errorHandler } from './middlewares';
import { NotFoundError } from './errors';
import { companyRouter } from './routes/companyRoute';
import { customerRouter } from './routes/customerRoute';
import { productRouter } from './routes/productRoute';
import { saleRouter } from './routes/saleRoute';

const app = express();
app.set('trust proxy', true);
app.use(json());

app.use(companyRouter);
app.use(customerRouter);
app.use(productRouter);
app.use(saleRouter);

app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
