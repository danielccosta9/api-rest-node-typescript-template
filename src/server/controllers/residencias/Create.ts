import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { ResidenciaProvider } from '../../database/provider/residencias';
import { validation } from '../../shared/middleware';
import { IResidencia } from '../../database/models';


interface IBodyProps extends Omit<IResidencia, 'id'> { }

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        tipo: yup.string().required().min(3).max(150),
        nome: yup.string().required().min(3).max(150),
    })),
}));

export const create = async (req: Request<{}, {}, IResidencia>, res: Response) => {
    const result = await ResidenciaProvider.create(req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.CREATED).json(result);
};