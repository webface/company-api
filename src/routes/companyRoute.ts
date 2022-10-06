import { NotFoundError } from '../errors';
import { validateRequest } from '../middlewares';
import express, { Request, Response } from 'express';
import { Company } from '../models/company';
import { body } from 'express-validator';

const router = express.Router();

router.get('/api/companies', async (req: Request, res: Response) => {
  const companies = await Company.find({});
  if (!companies) {
    throw new NotFoundError();
  }
  res.send(companies);
});

router.post(
  '/api/companies',
  [body('name').not().isEmpty().withMessage('Name is required')],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const company = Company.build({ name });
    await company.save();
    res.status(201).send(company);
  }
);

router.get('/api/companies/:id', async (req: Request, res: Response) => {
  const company = await Company.findById(req.params.id);
  if (!company) {
    throw new NotFoundError();
  }
  res.send(company);
});

router.put(
  '/api/companies/:id',
  [body('name').not().isEmpty().withMessage('Name is required')],
  validateRequest,
  async (req: Request, res: Response) => {
    const company = await Company.findById(req.params.id);
    if (!company) {
      throw new NotFoundError();
    }
    company.set({
      name: req.body.name,
    });
    await company.save();
    res.send(company);
  }
);

export { router as companyRouter };
