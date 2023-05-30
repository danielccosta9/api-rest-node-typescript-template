import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.pessoas, 
            table => {
                table.bigIncrements('id').primary().index();
                table.string('nome').index().notNullable();
                table.string('cpf').notNullable();
                table.string('nascimento').notNullable();
                table.string('telefone').notNullable();
                table.bigInteger('residenciaId').index().notNullable().references('id').inTable(ETableNames.residencias).onUpdate('CASCADE').onDelete('RESTRICT');
            })
        .then(() => console.log(`[Migration] Table ${ETableNames.pessoas} created!`));        
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.pessoas)
        .then(() => console.log(`[Migration] Table ${ETableNames.pessoas} dropped!`));
}


