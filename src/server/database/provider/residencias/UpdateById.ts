import { Knex } from '../../knex';
import { IResidencia } from '../../models';
import { ETableNames } from '../../ETableNames';

export const UpdateById = async (id: number, residencias: Omit<IResidencia, 'id'>): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.residencias)
            .update(residencias)
            .where('id', '=', id);

        if (result > 0) {
            return;
        } else {
            return new Error('Erro ao atualizar residencia');
        }
    } catch (error) {
        console.log(error);
        return new Error('Error ao atualizar residencia');
    }
};