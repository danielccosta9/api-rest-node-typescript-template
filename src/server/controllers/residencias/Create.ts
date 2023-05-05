import { Request, Response } from 'express';


interface IResidencia {
    nome: string;
}

export const create = (req: Request<{}, {}, IResidencia>, res: Response) => {

    console.log(req.body.nome);
    
    return res.send('Create Residencia');
};