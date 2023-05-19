import { Knex } from '../../knex';
import { IResidencia } from '../../models';
import { ETableNames } from '../../ETableNames';

export const getById = async (id: number): Promise<IResidencia | Error> => {

    try {
        const result = await Knex(ETableNames.residencias)
            .select('*')
            .where('id', '=', id)
            .first();

        if (result) {
            return result;
        } else {
            return new Error('Erro ao buscar residencia');
        }
    } catch (error) {
        console.log(error);
        return new Error('Error ao buscar residencia');
    }
};