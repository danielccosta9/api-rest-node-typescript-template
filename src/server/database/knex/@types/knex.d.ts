import { IResidencia, IPessoa, IUsuario } from '../../models';

declare module 'knex/types/tables' {
    interface Tables {
        residencias: IResidencia;
        pessoas: IPessoa;
        usuarios: IUsuario;
    }
}