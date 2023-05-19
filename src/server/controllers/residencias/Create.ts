import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { IResidencia } from '../../database/models';
import { ResidenciaProvider } from '../../database/provider/residencias';


interface IBodyProps extends Omit<IResidencia, 'id'> { }


export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        tipo: yup.string().required().matches(/^(BAIRRO|SITIO)$/),
        nome: yup.string().required().min(3).max(150).matches(/^[A-Z ]+$/),
    })),
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

    const result = await ResidenciaProvider.create(req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            }
        });
    }

    return res.status(StatusCodes.CREATED).json(result);
};