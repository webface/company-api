import { NotFoundError } from '../errors';
import { validateRequest } from '../middlewares';
import express, { Request, Response } from 'express';
import { Customer } from '../models/customer';
import { body } from 'express-validator';

const router = express.Router();

router.get('/api/customers', async (req: Request, res: Response) => {
  const customers = await Customer.find({});
  if (!customers) {
    throw new NotFoundError();
  }
  res.send(customers);
});

router.post(
  '/api/customers',
  [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('companyId').not().isEmpty().withMessage('Company is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, companyId } = req.body;
    const customer = Customer.build({ name, companyId });
    await customer.save();
    res.status(201).send(customer);
  }
);

router.get('/api/customers/:id', async (req: Request, res: Response) => {
  const customer = await Customer.findById(req.params.id).populate('companyId');
  if (!customer) {
    throw new NotFoundError();
  }
  res.send(customer);
});

router.put(
  '/api/customers/:id',
  [body('name').not().isEmpty().withMessage('Name is required')],
  validateRequest,
  async (req: Request, res: Response) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      throw new NotFoundError();
    }
    customer.set({
      name: req.body.name,
      companyId: req.body.companyId,
    });
    await customer.save();
    res.send(customer);
  }
);

export { router as customerRouter };
