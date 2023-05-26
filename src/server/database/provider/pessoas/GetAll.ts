import { ETableNames } from '../../ETableNames';
import { IPessoa } from '../../models';
import { Knex } from '../../knex';


export const getAll = async (page: number, limit: number, filter: string): Promise<IPessoa[] | Error> => {
    try {
        const result = await Knex(ETableNames.pessoas)
            .select('*')
            .where('nome', 'like', `%${filter}%`)
            .orWhere('cpf', 'like', `%${filter}%`)
            .offset((page - 1) * limit)
            .limit(limit);

        return result;
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar os registros');
    }
};