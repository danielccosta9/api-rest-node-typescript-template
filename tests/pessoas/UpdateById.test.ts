import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Pessoas - UpdateById', () => {

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

    it('Atualiza registro', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({ 
                nome: 'pessoa 1',
                cpf: '000.000.000-00',
                nascimento: '10/10/2010',
                telefone: '(83) 0000-0000',
                residenciaId
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(`/pessoas/${res1.body}`)
            .send({ 
                nome: 'pessoa 1',
                cpf: '000.000.000-00',
                nascimento: '10/10/2010',
                telefone: '(83) 0000-0000',
                residenciaId
            });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
    it('Tenta atualizar registro que não existe', async () => {

        const res1 = await testServer
            .put('/pessoas/99999')
            .send({ 
                nome: 'pessoa 1',
                cpf: '000.000.000-00',
                nascimento: '10/10/2010',
                telefone: '(83) 0000-0000',
                residenciaId
            });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});