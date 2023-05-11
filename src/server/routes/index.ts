import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ResidenciaCrontroller } from './../controllers';

const router = Router();

router.get('/', (_, res) => {
    return res.send('Olá, My Friends!');
});


router.post('/residencias',
    ResidenciaCrontroller.createValidation, 
    ResidenciaCrontroller.create
);

export { router };