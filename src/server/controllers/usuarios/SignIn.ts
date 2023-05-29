import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { UsuariosProvider } from '../../database/provider/usuarios';
import { validation } from '../../shared/middleware';
import { IUsuario } from '../../database/models';
import { JWTService, PasswordCrypto } from '../../shared/services';


interface IBodyProps extends Omit<IUsuario, 'id' | 'nome' | 'cpf' | 'nascimento' | 'telefone'> { }

export const signInValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().required().min(5).max(150).email(),
        senha: yup.string().required().min(6).max(150),
    })),
}));

export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {


    const { email, senha } = req.body;

    const usuario = await UsuariosProvider.getByEmail(email);

    if (usuario instanceof Error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha incorretos'
            }
        });
    }


    const passwordMatch = await PasswordCrypto.verifyPassword(senha, usuario.senha);

    if (!passwordMatch) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha incorretos'
            }
        });
    } else {
        const acessToken = JWTService.sign({ uid: usuario.id });

        if (acessToken === 'JWT_SECRET_NOT_FOUND') {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: 'Erro ao gerar token de acesso'
                }
            });
        }
        return res.status(StatusCodes.OK).json({ acessToken: acessToken});
    }
};