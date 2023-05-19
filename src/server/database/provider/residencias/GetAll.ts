import { Knex } from '../../knex';
import { IResidencia } from '../../models';
import { ETableNames } from '../../ETableNames';

export const getAll = async (page: number, limit: number, filter: string, id: 0): Promise<IResidencia[] | Error> => {
    try {
        const result = await Knex(ETableNames.residencias)
            .select('*')
            .where('id', Number(id))
            .orWhere('nome', 'like', `%${filter}%`)
            .offset((page - 1) * limit)
            .limit(limit);

        if (id > 0 && result.every(item => item.id !== id)) {
            const resultById = await Knex(ETableNames.residencias)
                .select('*')
                .where('id', Number(id))
                .first();

            if (resultById) {
                return [...result, resultById];
            }

        }
        return result;
    } catch (error) {
        console.log(error);
        return new Error('Error ao buscar residencias');
    }
};