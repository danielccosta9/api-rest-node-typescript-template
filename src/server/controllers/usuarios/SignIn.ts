import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { UsuariosProvider } from '../../database/provider/usuarios';
import { validation } from '../../shared/middleware';
import { IUsuario } from '../../database/models';
import { PasswordCrypto } from '../../shared/services';


interface IBodyProps extends Omit<IUsuario, 'id' | 'nome' | 'cpf' | 'nascimento' | 'telefone'> { }

export const signInValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().required().min(5).max(150).email(),
        senha: yup.string().required().min(6).max(150),
    })),
}));

export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {


    const { email, senha } = req.body;

    const result = await UsuariosProvider.getByEmail(email);

    if (result instanceof Error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha incorretos'
            }
        });
    }


    const passwordMatch = await PasswordCrypto.verifyPassword(senha, result.senha);

    if (!passwordMatch) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha incorretos'
            }
        });
    } else {
        return res.status(StatusCodes.OK).json({ acessToken: 'teste.teste.teste'});
    }
};