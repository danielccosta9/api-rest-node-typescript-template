import { Router } from 'express';

import { ResidenciaCrontroller, PessoaCrontroller, UsuarioCrontroller } from './../controllers';

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
            <li><a href="/entrar">POST /entrar</a></li>
            <li><a href="/cadastrar">POST /cadastrar</a></li>
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



router.get('/residencias', ResidenciaCrontroller.getAllValidation, ResidenciaCrontroller.getAll);
router.get('/residencias/:id', ResidenciaCrontroller.getByIdValidation, ResidenciaCrontroller.getById);
router.post('/residencias', ResidenciaCrontroller.createValidation,      ResidenciaCrontroller.create);
router.put('/residencias/:id', ResidenciaCrontroller.updateByIdValidation, ResidenciaCrontroller.updateById);
router.delete('/residencias/:id', ResidenciaCrontroller.deleteByIdValidation, ResidenciaCrontroller.deleteById);


router.get('/pessoas', PessoaCrontroller.getAllValidation, PessoaCrontroller.getAll);
router.get('/pessoas/:id', PessoaCrontroller.getByIdValidation, PessoaCrontroller.getById);
router.post('/pessoas', PessoaCrontroller.createValidation,      PessoaCrontroller.create);
router.put('/pessoas/:id', PessoaCrontroller.updateByIdValidation, PessoaCrontroller.updateById);
router.delete('/pessoas/:id', PessoaCrontroller.deleteByIdValidation, PessoaCrontroller.deleteById);


router.post('/entrar', UsuarioCrontroller.signInValidation, UsuarioCrontroller.signIn);
router.post('/cadastrar', UsuarioCrontroller.signUpValidation, UsuarioCrontroller.signUp);

export { router };