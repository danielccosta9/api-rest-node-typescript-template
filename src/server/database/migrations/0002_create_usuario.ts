import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.usuarios, 
            table => {
                table.bigIncrements('id').primary().index();
                table.string('nome').notNullable().checkLength('>=', 3);
                table.string('cpf').notNullable();
                table.string('nascimento').notNullable();
                table.string('telefone').notNullable();
                table.string('email').notNullable().unique().checkLength('>=', 5).index();
                table.string('senha').notNullable().checkLength('>=', 6);
            })
        .then(() => console.log(`[Migration] Table ${ETableNames.usuarios} created!`));        
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.usuarios)
        .then(() => console.log(`[Migration] Table ${ETableNames.usuarios} dropped!`));
}


