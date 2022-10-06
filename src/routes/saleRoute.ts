import { NotFoundError } from '../errors';
import { validateRequest } from '../middlewares';
import express, { Request, Response } from 'express';
import { Sale } from '../models/sale';
import { Product } from '../models/product';
import { body } from 'express-validator';

const router = express.Router();

router.get('/api/sales', async (req: Request, res: Response) => {
  const sales = await Sale.find({});
  if (!sales) {
    throw new NotFoundError();
  }
  res.send(sales);
});

router.post(
  '/api/sales',
  [body('productId').not().isEmpty().withMessage('Product is required')],
  validateRequest,
  async (req: Request, res: Response) => {
    const { productId } = req.body;
    const sale = Sale.build({ productId });
    await sale.save();
    res.status(201).send(sale);
  }
);

router.get('/api/sales/:id', async (req: Request, res: Response) => {
  const sale = await Sale.findById(req.params.id);
  if (!sale) {
    throw new NotFoundError();
  }
  const product = await Product.findById(sale.productId);
  if (!product) {
    throw new NotFoundError();
  }
  res.send(product);
});

export { router as saleRouter };
