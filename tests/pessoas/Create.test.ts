import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Pessoas - Create', () => {

    let residenciaId: number | undefined = undefined;
    beforeAll(async () => {
        const resResidencia = await testServer
            .post('/residencias')
            .send({
                tipo: 'BAIRRO',
                nome: 'CENTRO'
            });
        residenciaId = resResidencia.body;
    });

    it('Cria registro', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({
                nome: 'pessoa',
                cpf: '000.000.000-00',
                nascimento: '10/10/2010',
                telefone: '(83) 0000-0000',
                residenciaId
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');
    });
    it('Tenta criar um registro com nome muito curto', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({
                nome: 'pe',
                cpf: '000.000.000-00',
                nascimento: '10/10/2010',
                telefone: '(83) 0000-0000',
                residenciaId
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome');
    });
});