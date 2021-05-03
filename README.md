[link to site](https://highlights-catalogue.herokuapp.com/) <img src="./src/img/ML - Logo.png" alt="Mylights Logo" />
# MyLights 
MyLights is a web app that lets you manage and catalogue your highlighted passages from different books you've read. You can categorize each highlight with zero or many tags and then filter the highlights based on author, book, or tag. You can create any tag you like.

Users each have their own account.

## How to use the app (for users)
Visit the url: https://highlights-catalogue.herokuapp.com/ and sign up with email and password. Start adding your authors, books, tags, and highlights! If you're a kindle user there's two ways to access your highlights and notes by book.
1. Log into your kindle account at https://read.amazon.com/notebook. From there you can see your highlights and notes by book. 
1. In your kindle, go to a book and open the menu. There's an option to send yourself the highlights by email. The email will contain both pdf and csv files with your highlights.

From there, I like to add them to the app one by one, which is my way of reviewing the book and reflecting on what I've read.

## How to download the app (for developers)
1. Clone the repo and ```npm install```
2. Create a local postgres database (for local testing)
3. Create a .env file
    1. Define your .env variables DB_USER, DB_PW, DB_NAME.
    2. Make sure .env is in .gitignore
4. Run ```knex migrate:latest``` to create the database schema and ```knex seed:run filename``` for each file in the seed folder. (This will also need to be done for the production version. i.e. if using Heroku postgres in production, run the same commands in the Heroku command line)
5. Use ```npm run dev``` to run the backend server in hot-reload mode.
6. Use ```npm run hack``` to start the front end server in hot-reload mode.
7. Hack away!

## Technology used
* Postgres Database
* Knex for database migrations, seeding, connections
* NodeJS and express server for backend
* React front end
* Firebase for login

### Database schema 

![Database Schema](/img/SchemaDiagram.PNG)
