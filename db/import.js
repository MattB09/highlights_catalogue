const fs = require("fs");
const { default: knex } = require("knex");
const path = require('path');
const db = require("./knex");

(async () => {
    try {
        const data = fs.readFileSync(path.join(__dirname, "data/RedRisingData.csv"), {encoding: 'utf-8'});

        await db("highlights_tags").del();
        await db("Tags").del();
        await db("Highlights").del();
        await db("Books").del();
        await db("Authors").del();

        console.log("Existing data deleted...")

        let rows = data.split("\n");
        console.log(rows);
    
        
        //for (const row of highlightObj) {
            // check if tag exists already 
            //let tag = row['"tag"'].replace(/\"/g, "");
            //console.log(tag);
            //const tagID = await db('Tags').where('tag', tag).first();
            // add tags and authors and save tag and author_id
            
            //then add book with author_id
            //then add highlight with book_id
            //then add highlights_tags with tag_id and highlight_id

    //user_id: "XIBsbQfPQYZM4QPFIlgId4Wn8KZ2"
        //}

    } catch (err) {
        console.log("Error seeding data: ", err);
    }
})();