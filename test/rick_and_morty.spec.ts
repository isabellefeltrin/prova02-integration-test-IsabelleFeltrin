import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../simple-reporter';

describe('Rick and Morty API', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://reqres.in/api-docs/#/';

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  describe('Character', () => {
    it('GET ALL', async () => {
      await p.spec().get(`${baseUrl}/users`).expectStatus(StatusCodes.OK);
    });
  });
});
