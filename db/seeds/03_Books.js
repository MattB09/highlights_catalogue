
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Books').del()
    .then(function () {
      // Inserts seed entries
      return knex('Books').insert([
        {
          user_id: 'XIBsbQfPQYZM4QPFIlgId4Wn8KZ2', 
          title: 'Golden Son', 
          summary: "Awesome sci-fi book. Book 2 of a 6 book series.",
          year_published: 2014,
          year_read: 2017,
          author_id: 1
        },
      ]);
    });
};
