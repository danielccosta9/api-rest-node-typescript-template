import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../../shared/middleware';

interface IResidencias {
    tipo: string;
    nome: string;
}
export const createValidation = validation((getSchema) => ({
    body: getSchema<IResidencias>(yup.object().shape({
        tipo: yup.string().required(),
        nome: yup.string().required().min(3),
    })),
}));

export const create = async (req: Request<{}, {}, IResidencias>, res: Response) => {
    console.log(req.body);


    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado!');
};