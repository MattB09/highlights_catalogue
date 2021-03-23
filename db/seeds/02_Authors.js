
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Authors').del()
    .then(function () {
      // Inserts seed entries
      return knex('Authors').insert([
        {user_id: 'XIBsbQfPQYZM4QPFIlgId4Wn8KZ2', name: 'Pierce Brown'},
      ]);
    });
};
