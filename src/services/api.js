import axios from 'axios';
require('dotenv').config();

const PORT = process.env.PORT || 4000;

const  Api = axios.create({
    baseURL: process.env.PORT || `http://localhost:${PORT}`
})

export default Api;