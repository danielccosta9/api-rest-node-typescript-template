import { Knex } from '../../knex';
import { IResidencia } from '../../models';
import { ETableNames } from '../../ETableNames';

export const create = async (residencias: Omit<IResidencia, 'id'>): Promise<number | Error> => {

    try {
        const [result] = await Knex(ETableNames.residencias)
            .insert(residencias)
            .returning('id');

        if (typeof result === 'object') {
            return result.id;
        } else if (typeof result === 'number') {
            return result;
        } else {
            return new Error('Erro ao criar residencia');
        }
    } catch (error) {
        console.log(error);
        return new Error('Error ao criar residencia');
    }
};