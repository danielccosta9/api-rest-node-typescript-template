import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';


import { validation } from '../../shared/middleware';
import { IResidencia } from '../../database/models';
import { ResidenciaProvider } from '../../database/provider/residencias';

interface IParamsProps {
    id?: number;
}

interface IBodyProps extends Omit<IResidencia, 'id'> { }

export const updateByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamsProps>(yup.object().shape({
        id: yup.number().integer().optional().moreThan(0),
    })),
    body: getSchema<IBodyProps>(yup.object().shape({
        tipo: yup.string().required().min(3),
        nome: yup.string().required().min(3),
    })),
}));

export const updateById = async (req: Request<IParamsProps, {}, IBodyProps>, res: Response) => {

    const result = await ResidenciaProvider.UpdateById(Number(req.params.id), req.body);
  
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            }
        });
    }
    
    return res.status(StatusCodes.NO_CONTENT).send();
};