import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';

export const deleteById = async (id: number): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.residencias)
            .where('id', '=', id)
            .del();

        if (result > 0) {
            return;
        } else {
            return new Error('Erro ao deletar residencia');
        }
    } catch (error) {
        console.log(error);
        return new Error('Error ao deletar residencia');
    }
};