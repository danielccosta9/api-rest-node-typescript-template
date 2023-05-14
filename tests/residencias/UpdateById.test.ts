import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Residencias - UpdateById', () => {

    it('Atualiza registro', async () => {

        const res1 = await testServer
            .post('/residencias')
            .send({ 
                tipo: 'BAIRRO',
                nome: 'CENTRO' 
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(`/residencias/${res1.body}`)
            .send({ 
                tipo: 'BAIRRO',
                nome: 'CENTRO' 
            });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
    it('Tenta atualizar registro que não existe', async () => {

        const res1 = await testServer
            .put('/residencias/99999')
            .send({ 
                tipo: 'BAIRRO',
                nome: 'CENTRO' 
            });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});