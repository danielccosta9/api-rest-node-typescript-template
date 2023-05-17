import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { IResidencia } from '../../database/models';


interface IBodyProps extends Omit<IResidencia, 'id'> { }


export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        tipo: yup.string().required().matches(/^(BAIRRO|SITIO)$/),
        nome: yup.string().required().min(3).matches(/^[A-Z ]+$/),
    })),
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

    return res.status(StatusCodes.CREATED).json(1);
};