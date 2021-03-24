const { Router, Request, Response } = require("express");
const { getTags, getAuthors, getBooks, getHighlights, getAll } = require("./controller");
const { addTag, addAuthor, addBook, addHighlight, addRelations } = require("./controller");
const { editTag, editAuthor, editBook, editHighlight } = require("./controller");
const { deleteTag, deleteAuthor, deleteBook, deleteHighlight, deleteHlRelations, deleteTagRelations } = require("./controller");
const routes = Router();

// ------ get routes -------
routes.get('/api/:user_id/tags', getTags);
routes.get('/api/:user_id/authors', getAuthors);
routes.get('/api/:user_id/books', getBooks);
routes.get('/api/:user_id/highlights', getHighlights);
routes.get('/api/:user_id/all', getAll);

// -------- post routes -----------
routes.post('/api/:user_id/tags', addTag);
routes.post('/api/:user_id/authors', addAuthor);
routes.post('/api/:user_id/books', addBook);
routes.post('/api/:user_id/highlights', addHighlight);
routes.post('/api/:user_id/highlights/:id/tags', addRelations);

// -------- edit routes --------------
routes.put('/api/:user_id/tags/:id', editTag);
routes.put('/api/:user_id/authors/:id', editAuthor);
routes.put('/api/:user_id/books/:id', editBook);
routes.put('/api/:user_id/highlights/:id', editHighlight);

// ---------- delete routes --------
routes.delete('/api/:user_id/tags/:id', deleteTag);
routes.delete('/api/:user_id/authors/:id', deleteAuthor);
routes.delete('/api/:user_id/books/:id', deleteBook);
routes.delete('/api/:user_id/highlights/:id', deleteHighlight);
routes.delete('/api/:user_id/highlights/:id/tags/:ids', deleteHlRelations);
routes.delete('/api/:user_id/tags/:id/highlights/:ids', deleteTagRelations)


module.exports = routes;