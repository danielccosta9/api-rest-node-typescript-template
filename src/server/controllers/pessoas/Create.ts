import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { PessoaProvider } from '../../database/provider/pessoas';
import { validation } from '../../shared/middleware';
import { IPessoa } from '../../database/models';


interface IBodyProps extends Omit<IPessoa, 'id'> { }

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3).max(150),
        cpf: yup.string().required().min(14).max(14),
        nascimento: yup.string().required().min(10).max(10),
        telefone: yup.string().required().min(14).max(14),
        residenciaId: yup.number().required().integer(),
    })),
}));

export const create = async (req: Request<{}, {}, IPessoa>, res: Response) => {
    const result = await PessoaProvider.create(req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.CREATED).json(result);
};