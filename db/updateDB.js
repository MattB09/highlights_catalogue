const db = require("./knex");

async function updateNulls() {
    await db('highlights')
        .whereNull('reviewed')
        .update('reviewed', true );
}

updateNulls();