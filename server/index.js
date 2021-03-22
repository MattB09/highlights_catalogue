const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.resolve(__dirname, "..", "build")));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "build"));
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=> {
    console.log(`Server listening at localhost:${PORT}`);
});