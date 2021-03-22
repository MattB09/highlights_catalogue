import axios from 'axios';

const  Api = axios.create({
    baseURL: process.env.PORT || "http://localhost:4000"
})

export default Api;