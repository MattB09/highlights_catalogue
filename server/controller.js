const db = require("../db/knex");
const { request, response } = require("express");

const getTags = async(request, response) => {
    const result = await db.select('*').from("Tags").where('user_id', request.params.user_id);
    response.send(result);
}

const getAuthors = async(request, response) => {
    const result = await db.select('*').from("Authors").where('user_id', request.params.user_id);
    response.send(result);
}

const getBooks = async(request, response) => {
    const result = await db.select('*').from("Books").where('user_id', request.params.user_id);
    response.send(result);
}

const getHighlights = async(request, response) => {
    const result = await db.select('*').from("Highlights").where('user_id', request.params.user_id);
    response.send(result);
}

const getAll = async(request, response) => {
    const result = {}
    result.Tags = await db.select('*').from("Tags").where('user_id', request.params.user_id);
    result.Authors = await db.select('*').from("Authors").where('user_id', request.params.user_id);
    result.Books = await db.select('*').from("Books").where('user_id', request.params.user_id);
    result.Highlights = await db.select('*').from("Highlights").where('user_id', request.params.user_id);
    const highlightIds = result.Highlights.map(h => h.id);
    result.highlights_tags = await db.select('*').from("highlights_tags").whereIn("highlight_id", highlightIds);
    response.send(result);
}

module.exports = {
    getTags,
    getAuthors,
    getBooks,
    getHighlights,
    getAll
}