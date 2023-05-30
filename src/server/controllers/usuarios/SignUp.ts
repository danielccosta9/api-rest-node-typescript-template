import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { UsuariosProvider } from '../../database/provider/usuarios';
import { validation } from '../../shared/middleware';
import { IUsuario } from '../../database/models';


interface IBodyProps extends Omit<IUsuario, 'id'> { }

export const signUpValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3).max(150),
        cpf: yup.string().required().min(14).max(14),
        nascimento: yup.string().required().min(10).max(10),
        telefone: yup.string().required().min(14).max(14),
        email: yup.string().required().min(5).max(150).email(),
        senha: yup.string().required().min(6).max(150),
    })),
}));

export const signUp = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const result = await UsuariosProvider.create(req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.CREATED).json(result);
};