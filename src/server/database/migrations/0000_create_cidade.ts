import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.residencias, 
            table => {
                table.bigIncrements('id').primary().index();
                table.string('tipo', 10).notNullable();
                table.string('nome', 150).notNullable();
            })
        .then(() => console.log(`[Migration] Table ${ETableNames.residencias} created!`));        
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.residencias)
        .then(() => console.log(`[Migration] Table ${ETableNames.residencias} dropped!`));
}


