import { Router } from 'express';

import { ResidenciaCrontroller, PessoaCrontroller, UsuarioCrontroller } from './../controllers';
import { ensureAuthenticated } from '../shared/middleware';

const router = Router();

router.get('/', (_, res) => {
    return res.send(
        `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh;">
        <h1>API está rodando 🚀</h1> 
        <h2>Rotas disponíveis:</h2>
        <h3>Residencias</h3>
        <ul>
            <li><a href="/residencias">GET /residencias</a></li>
            <li><a href="/pessoas">GET /pessoas</a></li>
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



router.get('/residencias', ensureAuthenticated, ResidenciaCrontroller.getAllValidation, ResidenciaCrontroller.getAll);
router.get('/residencias/:id', ensureAuthenticated, ResidenciaCrontroller.getByIdValidation, ResidenciaCrontroller.getById);
router.post('/residencias', ensureAuthenticated, ResidenciaCrontroller.createValidation,      ResidenciaCrontroller.create);
router.put('/residencias/:id', ensureAuthenticated, ResidenciaCrontroller.updateByIdValidation, ResidenciaCrontroller.updateById);
router.delete('/residencias/:id', ensureAuthenticated, ResidenciaCrontroller.deleteByIdValidation, ResidenciaCrontroller.deleteById);


router.get('/pessoas', ensureAuthenticated, PessoaCrontroller.getAllValidation, PessoaCrontroller.getAll);
router.get('/pessoas/:id', ensureAuthenticated, PessoaCrontroller.getByIdValidation, PessoaCrontroller.getById);
router.post('/pessoas', ensureAuthenticated, PessoaCrontroller.createValidation,      PessoaCrontroller.create);
router.put('/pessoas/:id', ensureAuthenticated, PessoaCrontroller.updateByIdValidation, PessoaCrontroller.updateById);
router.delete('/pessoas/:id', ensureAuthenticated, PessoaCrontroller.deleteByIdValidation, PessoaCrontroller.deleteById);


router.post('/entrar', UsuarioCrontroller.signInValidation, UsuarioCrontroller.signIn);
router.post('/cadastrar', UsuarioCrontroller.signUpValidation, UsuarioCrontroller.signUp);

export { router };