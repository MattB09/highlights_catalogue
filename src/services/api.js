import axios from 'axios';
require('dotenv').config();

const PORT = process.env.PORT || 4000;

console.log("from services/api file -- this is your port, ", PORT);

let baseURL;
if (process.env.DATABASE_URL) {
    baseURL = "https://highlights-catalogue.herokuapp.com/";
} else {
    baseURL = `http://localhost:${PORT}`
}

// consider adding some if statement that can determine whether it's production or not (like the database check)
// then just hardcode the base heroku url https://highlights-catalogue.herokuapp.com/

const  Api = axios.create({
    baseURL: baseURL
})

export default Api;