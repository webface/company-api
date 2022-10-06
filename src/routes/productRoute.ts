import { NotFoundError } from '../errors';
import { validateRequest } from '../middlewares';
import express, { Request, Response } from 'express';
import { Product } from '../models/product';
import { body } from 'express-validator';

const router = express.Router();

router.get('/api/products', async (req: Request, res: Response) => {
  const products = await Product.find({});
  if (!products) {
    throw new NotFoundError();
  }
  res.send(products);
});

router.post(
  '/api/products',
  [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('companyId').not().isEmpty().withMessage('Company is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, companyId } = req.body;
    const product = Product.build({ name, companyId });
    await product.save();
    res.status(201).send(product);
  }
);

router.get('/api/products/:id', async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id).populate('companyId');
  if (!product) {
    throw new NotFoundError();
  }
  res.send(product);
});

router.put(
  '/api/products/:id',
  [body('name').not().isEmpty().withMessage('Name is required')],
  validateRequest,
  async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw new NotFoundError();
    }
    product.set({
      name: req.body.name,
      companyId: req.body.companyId,
    });
    await product.save();
    res.send(product);
  }
);

export { router as productRouter };
