import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Usuario - SignUp', () => {
    it('Cria registro', async () => {
        const res1 = await testServer
            .post('/cadastrar')
            .send({
                nome: 'usuario',
                cpf: '000.000.000-00',
                nascimento: '10/10/2010',
                telefone: '(83) 0000-0000',
                email: 'usuario@user.com',
                senha: '123456'
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');
    });

    it('Cria registro', async () => {
        const res1 = await testServer
            .post('/cadastrar')
            .send({
                nome: 'usuario2',
                cpf: '000.000.000-00',
                nascimento: '10/10/2010',
                telefone: '(83) 0000-0000',
                email: 'usuario2@user.com',
                senha: '123456'
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');
    });

    it('Tenta criar um registro com nome muito curto', async () => {
        const res1 = await testServer
            .post('/cadastrar')
            .send({
                nome: 'us',
                cpf: '000.000.000-00',
                nascimento: '10/10/2010',
                telefone: '(83) 0000-0000',
                email: 'usuario@create.com',
                senha: '123456'
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.nome');
    });

    it('Tenta criar um registro com email muito curto', async () => {
        const res1 = await testServer
            .post('/cadastrar')
            .send({
                nome: 'usuario',
                cpf: '000.000.000-00',
                nascimento: '10/10/2010',
                telefone: '(83) 0000-0000',
                email: '@com',
                senha: '123456'
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');
    });

    it('Tenta criar um registro com senha muito curta', async () => {
        const res1 = await testServer
            .post('/cadastrar')
            .send({
                nome: 'usuario',
                cpf: '000.000.000-00',
                nascimento: '10/10/2010',
                telefone: '(83) 0000-0000',
                email: 'usuario@senhaCurta.com',
                senha: '123'
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.senha');
    });
});