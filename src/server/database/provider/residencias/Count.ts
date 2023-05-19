import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const count = async (filter: ''): Promise<number | Error> => {
    try {
        const [{ count }] = await Knex(ETableNames.residencias)
            .where('nome', 'like', `%${filter}%`)
            .count<[{ count: number }]>('* as count');
        if (Number.isInteger(Number(count))) {
            return Number(count);
        } else {
            return new Error('Error ao buscar residencias');
        }
    } catch (error) {
        console.log(error);
        return new Error('Error ao buscar residencias');
    }
};