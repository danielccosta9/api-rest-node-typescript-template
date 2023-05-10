import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

interface IResidencia {
    nome: string;
    endereco: string;
}

const bodyValidationSchema: yup.Schema<IResidencia> = yup.object().shape({
    nome: yup.string().required().min(3),
    endereco: yup.string().required().min(3),
});

export const create = async (req: Request<{}, {}, IResidencia>, res: Response) => {

    let validateData: IResidencia | undefined = undefined;

    try {
        validateData = await bodyValidationSchema.validate(req.body, { abortEarly: false });
    } catch (err) {
        const yupError = err as yup.ValidationError;
        const errors: Record<string, string> = {};

        yupError.inner.forEach((error) => {
            if (error.path === undefined) return;
            errors[error.path] = error.message;
        });

        return res.status(StatusCodes.BAD_REQUEST).json({ errors });
    }

    console.log(req.body.nome);
    
    return res.send('Create Residencia');
};