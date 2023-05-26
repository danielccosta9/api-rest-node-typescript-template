import { IResidencia, IPessoa } from '../../models';

declare module 'knex/types/tables' {
    interface Tables {
        residencias: IResidencia;
        pessoas: IPessoa;
        // usuario: IUsuario;
    }
}