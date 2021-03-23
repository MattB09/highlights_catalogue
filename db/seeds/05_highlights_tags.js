
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('highlights_tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('highlights_tags').insert([
        {highlight_id: 1, tag_id: 10},
        {highlight_id: 1, tag_id: 13},
        {highlight_id: 1, tag_id: 15},
        {highlight_id: 2, tag_id: 10},
        {highlight_id: 3, tag_id: 10},
        {highlight_id: 3, tag_id: 5},
        {highlight_id: 4, tag_id: 10},
        {highlight_id: 5, tag_id: 7},
        {highlight_id: 5, tag_id: 10},
        {highlight_id: 6, tag_id: 10},
        {highlight_id: 7, tag_id: 10},
        {highlight_id: 7, tag_id: 12},
        {highlight_id: 7, tag_id: 14},
        {highlight_id: 8, tag_id: 10},
        {highlight_id: 9, tag_id: 10},
        {highlight_id: 10, tag_id: 10},
        {highlight_id: 10, tag_id: 3},
        {highlight_id: 10, tag_id: 11},
        {highlight_id: 11, tag_id: 10},
        {highlight_id: 11, tag_id: 6},
        {highlight_id: 11, tag_id: 15},
        {highlight_id: 12, tag_id: 10},
        {highlight_id: 12, tag_id: 15},
        {highlight_id: 13, tag_id: 10},
        {highlight_id: 13, tag_id: 15},
        {highlight_id: 14, tag_id: 10},
        {highlight_id: 14, tag_id: 14},
        {highlight_id: 15, tag_id: 10},
        {highlight_id: 15, tag_id: 14},
        {highlight_id: 16, tag_id: 10},
        {highlight_id: 16, tag_id: 15},
        {highlight_id: 17, tag_id: 10},
        {highlight_id: 17, tag_id: 5},
        {highlight_id: 18, tag_id: 10},
        {highlight_id: 19, tag_id: 10},
        {highlight_id: 19, tag_id: 9},
        {highlight_id: 20, tag_id: 10},
        {highlight_id: 20, tag_id: 9}
      ]);
    });
};
