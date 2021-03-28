# MyLights

MyLights is a web app that lets users manage their highlights and notes from different books they've read. You can categorize each highlight with 0 or many tags and then filter the highlights based on author, book, or tag. You can create any tag you like.

Users each have their own account.

## How to use the app (for users)

Visit the url: https://highlights-catalogue.herokuapp.com/ and sign up with email and password. Start adding your authors, books, tags, and highlights!

## How to download the app (for developers)

1. clone the repo and npm install
2. create a local postgres database (for local testing)
3. Create a .env file
    i. Define your .env variables DB_USER, DB_PW, DB_NAME.
    ii. Make sure .env is in .gitignore
4. Run knex migrate:latest to create the database schema and knex seed:run <filename> for each file in the seed folder. (This will also need to be done for the production version. i.e. if using Heroku, run the same commands in the Heroku command line)
5. Use npm run dev to run the backend server in hot-reload mode.
6. Use npm run hack to start the front end server in hot-reload mode.
7. Hack away!


## Technology used

* Postgres Database
* Knex for database migrations, seeding, connections
* NodeJS and express server for backend
* React front end
* Firebase for login

### Database schema 

![Database Schema](/img/SchemaDiagram.PNG)