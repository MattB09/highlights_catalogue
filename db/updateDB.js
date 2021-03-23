const db = require("./knex");

async function updateNulls() {
    await db('Highlights')
        .whereNull('reviewed')
        .update('reviewed', true );
}

updateNulls();