import { app } from '../../app';
import request from 'supertest';
import { Company } from '../../models/company';

const createCompany = (name: string) => {
  return request(app).post('/api/companies').send({ name });
};

it('can fetch a list of companies', async () => {
  await createCompany('Blaze');
  await createCompany('Telus');
  await createCompany('Organimi');

  const companyResponse = await request(app)
    .get('/api/companies')
    .send()
    .expect(200);

  expect(companyResponse.body.length).toEqual(3);
});
