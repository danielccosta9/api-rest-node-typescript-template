import { ETableNames } from '../../ETableNames';
import { IResidencia } from '../../models';
import { Knex } from '../../knex';


export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<IResidencia[] | Error> => {
    try {
        const result = await Knex(ETableNames.residencias)
            .select('*')
            .where('nome', 'like', `%${filter}%`)
            .orWhere('tipo', 'like', `%${filter}%`)
            .limit(limit)
            .offset((page - 1) * limit);

        if (id > 0 && result.every(item => item.id !== id)) {
            const resultById = await Knex(ETableNames.residencias)
                .select('*')
                .where({ id })
                .first();

            if (resultById) return [...result, resultById];
        }

        return result;
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar os registros');
    }
};