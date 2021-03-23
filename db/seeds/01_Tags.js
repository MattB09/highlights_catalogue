
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('Tags').insert([
        {user_id: 'XIBsbQfPQYZM4QPFIlgId4Wn8KZ2', tag: 'Ancient Rome'}, //1
        {user_id: 'XIBsbQfPQYZM4QPFIlgId4Wn8KZ2', tag: 'Book References'}, //2
        {user_id: 'XIBsbQfPQYZM4QPFIlgId4Wn8KZ2', tag: 'Humanity'}, //3
        {user_id: 'XIBsbQfPQYZM4QPFIlgId4Wn8KZ2', tag: 'Inspiring'}, //4
        {user_id: 'XIBsbQfPQYZM4QPFIlgId4Wn8KZ2', tag: 'Latin'}, //5
        {user_id: 'XIBsbQfPQYZM4QPFIlgId4Wn8KZ2', tag: 'Leadership'}, //6
        {user_id: 'XIBsbQfPQYZM4QPFIlgId4Wn8KZ2', tag: 'Love'}, //7
        {user_id: 'XIBsbQfPQYZM4QPFIlgId4Wn8KZ2', tag: 'Mythology'}, //8
        {user_id: 'XIBsbQfPQYZM4QPFIlgId4Wn8KZ2', tag: 'Oppression'}, //9
        {user_id: 'XIBsbQfPQYZM4QPFIlgId4Wn8KZ2', tag: 'Red Rising Series'}, //10
        {user_id: 'XIBsbQfPQYZM4QPFIlgId4Wn8KZ2', tag: 'Solar System'}, //11
        {user_id: 'XIBsbQfPQYZM4QPFIlgId4Wn8KZ2', tag: 'Stoicism'}, //12
        {user_id: 'XIBsbQfPQYZM4QPFIlgId4Wn8KZ2', tag: 'Success'}, //13
        {user_id: 'XIBsbQfPQYZM4QPFIlgId4Wn8KZ2', tag: 'Vivid Writing'}, //14
        {user_id: 'XIBsbQfPQYZM4QPFIlgId4Wn8KZ2', tag: 'War'} //15
      ]);
    });
};
