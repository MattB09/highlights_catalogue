import axios from 'axios';
require("dotenv").config();

const  Api = axios.create({
    baseURL: process.env.PORT || "http://localhost:4000"
})

export default Api;