import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ResidenciaCrontroller } from './../controllers';

const router = Router();

router.get('/', (_, res) => {
    return res.send('Olá, My Friends!');
});



router.get('/residencias',
    ResidenciaCrontroller.getAllValidation,
    ResidenciaCrontroller.getAll
);

router.get('/residencias/:id',
    ResidenciaCrontroller.getByIdValidation,
    ResidenciaCrontroller.getById
);

router.post('/residencias',
    ResidenciaCrontroller.createValidation, 
    ResidenciaCrontroller.create
);

router.put('/residencias/:id',
    ResidenciaCrontroller.updateByIdValidation,
    ResidenciaCrontroller.updateById
);

router.delete('/residencias/:id',
    ResidenciaCrontroller.deleteByIdValidation,
    ResidenciaCrontroller.deleteById
);

export { router };