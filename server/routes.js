const { Router, Request, Response } = require("express");
const { getTags, getAuthors, getBooks, getHighlights, getAll } = require("./controller");
const routes = Router();

routes.get('/api/:user_id/tags', getTags);

routes.get('/api/:user_id/authors', getAuthors);

routes.get('/api/:user_id/books', getBooks);

routes.get('/api/:user_id/highlights', getHighlights);

routes.get('/api/:user_id/all', getAll);

module.exports = routes;