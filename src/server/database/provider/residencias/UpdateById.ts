import { ETableNames } from '../../ETableNames';
import { IResidencia } from '../../models';
import { Knex } from '../../knex';


export const updateById = async (id: number, residencia: Omit<IResidencia, 'id'>): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.residencias)
            .update(residencia)
            .where('id', '=', id);

        if (result > 0) return;

        return new Error('Erro ao atualizar o registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao atualizar o registro');
    }
};