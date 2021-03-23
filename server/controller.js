const db = require("../db/knex");
const { request, response } = require("express");

// ------- Get functions ----------
const getTags = async (request, response) => {
    const result = await db.select('*').from("Tags").where('user_id', request.params.user_id);
    response.send(result);
}

const getAuthors = async (request, response) => {
    const result = await db.select('*').from("Authors").where('user_id', request.params.user_id);
    response.send(result);
}

const getBooks = async (request, response) => {
    const result = await db.select('*').from("Books").where('user_id', request.params.user_id);
    response.send(result);
}

const getHighlights = async (request, response) => {
    const result = await db.select('*').from("Highlights").where('user_id', request.params.user_id);
    response.send(result);
}

const getAll = async (request, response) => {
    const result = {}
    result.Tags = await db.select('*').from("Tags").where('user_id', request.params.user_id);
    result.Authors = await db.select('*').from("Authors").where('user_id', request.params.user_id);
    result.Books = await db.select('*').from("Books").where('user_id', request.params.user_id);
    result.Highlights = await db.select('*').from("Highlights").where('user_id', request.params.user_id);
    const highlightIds = result.Highlights.map(h => h.id);
    result.highlights_tags = await db.select('*').from("highlights_tags").whereIn("highlight_id", highlightIds);
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
    response.send(added);
}

const addRelations = async (request, response) => {
    const results = [];
    for (const tag of request.body.tags) {
        const addedRel = await db('highlights_tags').insert({
            highlight_id: request.params.id,
            tag_id: tag
        }).returning('*');
        results.push(addedRel[0]);
    }
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
    const result = await db('Tags').where({
        id: request.params.id,
        user_id: request.params.user_id
    }).del().returning('*');
    response.send(result);
}

const deleteAuthor = async (request, response) => {
    const result = await db('Authors').where({
        id: request.params.id,
        user_id: request.params.user_id
    }).del().returning('*');
    response.send(result);
}

const deleteBook = async (request, response) => {
    const result = await db('Books').where({
        id: request.params.id,
        user_id: request.params.user_id
    }).del().returning('*');
    response.send(result);
}

const deleteHighlight = async (request, response) => {
    const result = await db("Highlights").where({
        user_id: request.params.user_id,
        id: request.params.id
    }).del().returning('*');
    response.send(result);
}

const deleteRelations = async (request, response) => {
    const results = [];
    for (const tag of request.body.tags) {
        const deletedRel = await db('highlights_tags').where({
            highlight_id: request.params.id,
            tag_id: tag
        }).del().returning('*');
        results.push(deletedRel[0]);
    }
    response.send(results);
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
    addRelations,
    editTag,
    editAuthor,
    editBook,
    editHighlight,
    deleteTag,
    deleteAuthor,
    deleteBook,
    deleteHighlight,
    deleteRelations
}