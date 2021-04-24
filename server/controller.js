const db = require("../db/knex");
const { request, response } = require("express");

// ------- Get functions ----------
const getTags = async (request, response) => {
    const result = await db.select('*').from("Tags").where('user_id', request.params.user_id)
        .orderBy('tag');
    response.send(result);
}

const getAuthors = async (request, response) => {
    const result = await db.select('*').from("Authors").where('user_id', request.params.user_id)
        .orderBy('name');
    response.send(result);
}

const getBooks = async (request, response) => {
    const result = await db("Books").join('Authors', "Books.author_id", "=", "Authors.id")
        .select("Books.id", "title", "summary", "Books.user_id", "author_id", "Authors.name", "year_published", "year_read")
        .where('Books.user_id', request.params.user_id).orderBy(['title', 'year_published']);
    response.send(result);
}

const getHighlights = async (request, response) => {
    const result = await db.select('*').from("Highlights").where('user_id', request.params.user_id);
    response.send(result);
}

const getAll = async (request, response) => {
    // all highlights
    const highlightsQ = await db.raw(`SELECT
        "Highlights".id,
        highlight,
        reviewed,
        COALESCE(( 
                SELECT
                    json_build_object(
                        'id', "Books".id, 
                        'title', "Books".title,
                        'summary', "Books".summary,
                        'year_published', "Books".year_published,
                        'year_read', "Books".year_read,
                        'author_id', "Books".author_id,
                        'author', "Authors".name
                    )
                FROM "Books" 
                JOIN "Authors" ON "Authors".id = "Books".author_id
                WHERE "Highlights".book_id = "Books".id
                ), '{}'::json) book,
        COALESCE(( 
            SELECT
                json_agg(json_build_object('id', "Tags".id, 'tag', "Tags".tag)) 
            FROM "Tags" 
            JOIN "highlights_tags" ON "highlights_tags".tag_id = "Tags".id
            WHERE "highlights_tags".highlight_id = "Highlights".id), '[]'::json) tags
    FROM "Highlights"
    WHERE "Highlights".user_id = ?
    ORDER BY highlight`, request.params.user_id);

    // tags
    const tags = await db.select('*').from("Tags").where('user_id', request.params.user_id)
        .orderBy('tag');

    // authors
    const authors = await db.select('*').from("Authors").where('user_id', request.params.user_id)
    .orderBy('name');

    // books
    const books = await db("Books").join('Authors', "Books.author_id", "=", "Authors.id")
    .select("Books.id", "title", "summary", "Books.user_id", "author_id", "Authors.name", "year_published", "year_read")
    .where('Books.user_id', request.params.user_id).orderBy(['title', 'year_published']);

    const result = {
        highlights: highlightsQ.rows,
        tags,
        authors,
        books
    }

    response.send(result);
}

// ----------- Add functions ---------------
const addTag = async (request, response) => {
    const newTag = {
        tag: request.body.tag,
        user_id: request.params.user_id
    }
    const added = await db('Tags').insert(newTag).returning('*')
    response.send(added);
}

const addAuthor = async (request, response) => {
    const newAuthor = {
        name: request.body.author,
        user_id: request.params.user_id
    }
    const added = await db('Authors').insert(newAuthor).returning('*');
    response.send(added);
}

const addBook = async (request, response) => {
    const newBook = {
        title: request.body.title,
        summary: request.body.summary,
        year_published: request.body.year_published,
        year_read: request.body.year_read,
        author_id: request.body.author_id,
        user_id: request.params.user_id
    }
    const added = await db('Books').insert(newBook).returning('*');
    response.send(added);
}

const addHighlight = async (request, response) => {
    const newHighlight = {
        highlight: request.body.highlight,
        reviewed: request.body.reviewed,
        book_id: request.body.book_id, 
        user_id: request.params.user_id
    }
    const added = await db('Highlights').insert(newHighlight).returning('*');
    const highlight_id = added[0].id;
    console.log("highlight added: tags", request.body.tags)
    for (const tag of request.body.tags) {
        await db('highlights_tags').insert({
            highlight_id,
            tag_id: tag.id
        });
    }
    response.send(added);
}

const addRelation = async (request, response) => {
    const results = await db('highlights_tags').insert({
        highlight_id: request.params.h_id,
        tag_id: request.params.t_id
    }).returning('*');
    response.send(results);
}

// ----------- Edit functions ------------
const editTag = async (request, response) => {
    const result = await db('Tags').where({
        id: request.params.id,
        user_id: request.params.user_id
    }).update({tag: request.body.tag}).returning('*');
    response.send(result);
}

const editAuthor = async (request, response) => {
    const result = await db('Authors').where({
        id: request.params.id,
        user_id: request.params.user_id
    }).update({name: request.body.name}).returning('*');
    response.send(result);
}

const editBook = async (request, response) => {
    const editedBook = {
        title: request.body.title,
        summary: request.body.summary,
        year_published: request.body.year_published,
        year_read: request.body.year_read,
        author_id: request.body.author_id,
        user_id: request.params.user_id
    }
    const result = await db('Books').where({
        id: request.params.id,
        user_id: request.params.user_id
    }).update(editedBook).returning('*');
    response.send(result);
}

const editHighlight = async (request, response) => {
    const editedHighlight = {
        highlight: request.body.highlight,
        reviewed: request.body.reviewed,
        book_id: request.body.book_id, 
        user_id: request.params.user_id
    }
    const result = await db('Highlights').where({
        user_id: request.params.user_id,
        id: request.params.id
    }).update(editedHighlight).returning('*');
    response.send(result);
}

// ----------- Delete functions ------------
const deleteTag = async (request, response) => {
    // delete all tagged instances from highlights_tags table
    await db("highlights_tags").where({
        tag_id: request.params.id
    }).del();
    // delete the tag from the Tags table
    const result = await db('Tags').where({
        id: request.params.id,
        user_id: request.params.user_id
    }).del().returning('*');
    response.send(result);
}

const deleteAuthor = async (request, response) => {
    const nulledBooks = await db("Books").where({
        author_id: request.params.id,
        user_id: request.params.user_id 
    }).update({author_id: null}).returning('*');
    const result = await db('Authors').where({
        id: request.params.id,
        user_id: request.params.user_id
    }).del().returning('*');
    response.send(result);
}

const deleteBook = async (request, response) => {
    let hIds = await db.select("id").from("Highlights").where({
        book_id: request.params.id,
        user_id: request.params.user_id
    });
    hIds = hIds.map(h => h.id);
    //first delete related highlights_tags
    await db("highlights_tags").whereIn('highlight_id', hIds).del();
    // then delete related highlights
    await db('Highlights').whereIn('id', hIds).del();
    // then delete the book
    const result = await db('Books').where({
        id: request.params.id,
        user_id: request.params.user_id
    }).del().returning('*');
    response.send(result);
}

const deleteHighlight = async (request, response) => {
    await db("highlights_tags").where({
        highlight_id: request.params.id
    }).del();
    const result = await db("Highlights").where({
        user_id: request.params.user_id,
        id: request.params.id
    }).del().returning('*');
    response.send(result);
}

const deleteRelation = async (request, response) => {
    const result = await db("highlights_tags").where({
        highlight_id: request.params.h_id,
        tag_id: request.params.t_id
    }).del().returning('*');
    response.send(result);
}

module.exports = {
    getTags,
    getAuthors,
    getBooks,
    getHighlights,
    getAll,
    addTag,
    addAuthor,
    addBook,
    addHighlight,
    addRelation,
    editTag,
    editAuthor,
    editBook,
    editHighlight,
    deleteTag,
    deleteAuthor,
    deleteBook,
    deleteHighlight,
    deleteRelation
}