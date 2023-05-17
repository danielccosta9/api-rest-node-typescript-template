import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ResidenciaCrontroller } from './../controllers';

const router = Router();

router.get('/', (_, res) => {
    return res.send(
        `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh;">
        <h1>API está rodando 🚀</h1> 
        <h2>Rotas disponíveis:</h2>
        <h3>Residencias</h3>
        <ul>
            <li><a href="/residencias">GET /residencias</a></li>
        </ul>
        <footer style="margin-top: 100px;"
        >
            <p> 🧑‍💻 Desenvolvido por: <a href="https://www.instagram.com/danic.costa/" target="_blank">Daniel C. Costa</a></p>
        </footer>
        </div>
        <style>* { font-family: Helvetica, Arial, sans-serif; }</style>
        `
    );
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