
exports.up = function(knex) {
    // Authors table
    return knex.schema.createTable('Authors', (table)=> {
        table.increments();
        table.string('name').notNullable();
        table.string('user_id').notNullable();
    })
    // books table
    .createTable('Books', (table) => {
        table.increments();
        table.string('title').notNullable();
        table.text('summary');
        table.integer('year_published');
        table.integer('year_read');
        table.integer('author_id').references('id').inTable('Authors');
        table.string('user_id').notNullable();
    })
    // highlights table
    .createTable('Highlights', (table) => {
        table.increments();
        table.text('highlight').notNullable();
        table.boolean('reviewed');
        table.integer('book_id').references('id').inTable('Books');
        table.string('user_id').notNullable();
    })
    // tags table
    .createTable('Tags', (table)=> {
        table.increments();
        table.string('tag').notNullable();
        table.string('user_id').notNullable();
    })
    // highlights_tags table
    .createTable('highlights_tags', (table) => {
        table.integer('highlight_id').references('id').inTable('Highlights');
        table.integer('tag_id').references('id').inTable('Tags');
        table.primary(['highlight_id', 'tag_id']);
    })
  };
  
  exports.down = function(knex) {
    return knex.schema
        .dropTable('highlights_tags')
        .dropTable('Tags')
        .dropTable('Highlights')
        .dropTable('Books')
        .dropTable('Authors');
  };