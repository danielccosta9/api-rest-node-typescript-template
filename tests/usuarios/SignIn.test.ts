import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Usuários - SignIn', () => {
    beforeAll(async () => {
        await testServer.post('/cadastrar').send({
            nome: 'usuario',
            cpf: '000.000.000-00',
            nascimento: '10/10/2010',
            telefone: '(83) 0000-0000',
            email: 'usuario@user.com',
            senha: '123456'
        });
    });
    

    it('Faz login', async () => {
        const res1 = await testServer
            .post('/entrar')
            .send({
                email: 'usuario@user.com',
                senha: '123456'
            });
        expect(res1.statusCode).toEqual(StatusCodes.OK);
        expect(res1.body).toHaveProperty('accessToken');
    });

    it('Senha errada', async () => {
        const res1 = await testServer
            .post('/entrar')
            .send({
                senha: '1234567',
                email: 'usuario@user.com',
            });
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });

    it('Email errado', async () => {
        const res1 = await testServer
            .post('/entrar')
            .send({
                senha: '123456',
                email: 'usuarioooo@user.com',
            });
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });

    it('Formato de email inválido', async () => {
        const res1 = await testServer
            .post('/entrar')
            .send({
                senha: '123456',
                email: 'user gmail.com',
            });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');
    });

    it('Senha muito pequena', async () => {
        const res1 = await testServer
            .post('/entrar')
            .send({
                senha: '12',
                email: 'usuario@user.com',
            });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.senha');
    });

    it('Não informado a senha', async () => {
        const res1 = await testServer
            .post('/entrar')
            .send({
                email: 'usuario@user.com',
            });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.senha');
    });

    it('Não informado email', async () => {
        const res1 = await testServer
            .post('/entrar')
            .send({
                senha: '123456',
            });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');
    });
});