import { IResidencia } from '../../models';

declare module 'knex/types/tables' {
    interface Tables {
        residencias: IResidencia;
        // pessoa: IPessoa;
        // usuario: IUsuario;
    }
}