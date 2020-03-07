const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/databakery');

client.connect();

const sync = async() => {
    const SQL = `
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        DROP TABLE IF EXISTS recipes;
        DROP TABLE IF EXISTS chefs;
        CREATE TABLE chefs(
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            name VARCHAR(50) NOT NULL UNIQUE,
            CHECK (char_length(name) > 0)
        );
        CREATE TABLE recipes(
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            name VARCHAR(200) NOT NULL,
            CHECK (char_length(name) > 0),
            "chefId" UUID REFERENCES chefs(id)
        );
    `;
    client.query(SQL);

    const [Juan, Ui, Ferris, Thomas, Megan] = await Promise.all([
        createChef({name: 'Juan'}),
        createChef({name: 'Ui'}),
        createChef({name: 'Ferris'}),
        createChef({name: 'Thomas'}),
        createChef({name: 'Megan'})
    ]);
    const [potato, tomato, okonomiyaki, enchiladas] = await Promise.all([
        createRecipe({name: 'Potato Stew', chefId: Thomas.id}),
        createRecipe({name: 'Tomato Soup', chefId: Ferris.id}),
        createRecipe({name: 'Tako Okonomiyaki', chefId: Ui.id}),
        createRecipe({name: 'Bomb Enchiladas', chefId: Juan.id}),
        createRecipe({name: 'Omedetai no Sekihan to Ohagi', chefId: Ui.id}),
        createRecipe({name: 'Jumbalaya', chefId: null})
    ]);
};

const createChef = async(chef) => {
    const SQL = 'INSERT INTO chefs(name) values($1) returning *';
    return (await client.query(SQL, [chef.name])).rows[0];
};

const createRecipe = async(recipe) => {
    const SQL = 'INSERT INTO recipes(name, "chefId") values($1, $2) returning *';
    return (await client.query(SQL, [recipe.name, recipe.chefId])).rows[0];
}

const readTable = async(table) => {
    const SQL = `SELECT * FROM ${ table }`;
    return (await client.query(SQL)).rows;
};

module.exports = {
    sync,
    createChef,
    createRecipe,
    readTable
};