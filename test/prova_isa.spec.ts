import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../simple-reporter';

describe('Rick and Morty API', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://reqres.in/api-docs/#/';
  let customId = '';

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  describe('Character', () => {
    it('GET ALL', async () => {
      await p.spec().get(`${baseUrl}/users`).expectStatus(StatusCodes.OK);
    });

    it('POST LOGIN - SUCESS', async () => {
      await p
        .spec()
        .post(`${baseUrl}/login`)
        .withJson({
          username: 'isabelle',
          email: 'isa@gmail.com',
          password: 'teste123'
        })
        .expectStatus(StatusCodes.OK);
    });

    it('POST REGISTER - SUCESS', async () => {
      await p
        .spec()
        .post(`${baseUrl}/login`)
        .withJson({
          username: 'isabelle',
          email: 'isa@gmail.com',
          password: 'teste123'
        })
        .expectStatus(StatusCodes.OK);
    });

    it('get CUSTOM PATH', async () => {
      await p.spec().get(`${baseUrl}/custom/1`).expectStatus(StatusCodes.OK);
    });

    it('POST CUSTOM ENDPOINT', async () => {
      customId = await p
        .spec()
        .post(`${baseUrl}/login`)
        .withJson({
          name: 'TESTE',
          path: 'TESTE',
          method: 'GET',
          response_data: {},
          status_code: 200,
          headers: {}
        })
        .expectStatus(StatusCodes.OK)
        .returns('id');
    });

    it('GET CUSTOM ENDPOINT', async () => {
      await p.spec().get(`${baseUrl}/custom/1`).expectStatus(StatusCodes.OK);
    });

    it('GET CUSTOM ID', async () => {
      await p
        .spec()
        .get(`${baseUrl}/brands/${customId}`)
        .expectStatus(StatusCodes.OK);
    });

    it('ATUALIZAR DADOS CUSTOM', async () => {
      await p
        .spec()
        .put(`${baseUrl}/custom-endpoints/${customId}`)
        .withJson({
          name: 'abobrinha',
          path: 'abobrinha',
          method: 'GET',
          response_data: {},
          status_code: 0,
          headers: {},
          is_active: true
        })
        .expectStatus(StatusCodes.OK);
    });

    it('DELETAR CUSTOM', async () => {
      await p
        .spec()
        .delete(`${baseUrl}/custom-endpoints/${customId}`)
        .expectStatus(StatusCodes.OK);
    });

    it('executando custom', async () => {
      await p.spec().put(`${baseUrl}/custom/1`).expectStatus(StatusCodes.OK);
    });
  });
});
