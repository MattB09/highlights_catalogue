
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Highlights').del()
    .then(function () {
      // Inserts seed entries
      return knex('Highlights').insert([
        {reviewed: true, user_id: 'XIBsbQfPQYZM4QPFIlgId4Wn8KZ2', book_id: 1, highlight: 'A fool pulls the leaves. A brute chops the trunk. A sage digs the roots.'},
        {reviewed: true, user_id: 'XIBsbQfPQYZM4QPFIlgId4Wn8KZ2', book_id: 1, highlight: 'A man is never too young to kill, never too wise, never too strong, but he can damn well be too rich.'},
        {reviewed: true, user_id: 'XIBsbQfPQYZM4QPFIlgId4Wn8KZ2', book_id: 1, highlight: 'Audentes fortuna juvats.\nEnglish: Fortune favors the bold'},
        {reviewed: true, user_id: 'XIBsbQfPQYZM4QPFIlgId4Wn8KZ2', book_id: 1, highlight: 'Before you die, you’ll realize it was a mistake to kill Tactus, because you never gave him the chance to believe he was a good man.'},
        {reviewed: true, user_id: 'XIBsbQfPQYZM4QPFIlgId4Wn8KZ2', book_id: 1, highlight: 'Friendships take minutes to make, moments to break, years to repair.'},
        {reviewed: true, user_id: 'XIBsbQfPQYZM4QPFIlgId4Wn8KZ2', book_id: 1, highlight: 'Hateful to me as the gates of Hades is that man who hides one thing in his heart and speaks another.'},
        {reviewed: true, user_id: 'XIBsbQfPQYZM4QPFIlgId4Wn8KZ2', book_id: 1, highlight: 'He is as he always told me to be—a stone amid the waves; wet, yet unimpressed by all that swirls about him.'},
        {reviewed: true, user_id: 'XIBsbQfPQYZM4QPFIlgId4Wn8KZ2', book_id: 1, highlight: 'Hic sunt leones. “Here be lions.”'},
        {reviewed: true, user_id: 'XIBsbQfPQYZM4QPFIlgId4Wn8KZ2', book_id: 1, highlight: 'Home isn’t where you’re from, it’s where you find light when all grows dark.'},
        {reviewed: true, user_id: 'XIBsbQfPQYZM4QPFIlgId4Wn8KZ2', book_id: 1, highlight: 'I would have us continue forever. I would shepherd us out of the Solar System into alien ones. Seek new life. We are barely in our infancy as a species. But I would make man the immutable fixture in the universe, not just some passing bacteria that flashes and fades with no one to remember. That is why I know there is a proper way to live. Why I believe your young ideas so dangerous.” His mind is vast. Worlds beyond my own. And perhaps for the first time, I really understand how this man can do what he does. There is no morality to him. No goodness. No evil intent when he killed Eo. He believes he is beyond morality. His aspirations are so grand that he has become inhuman in his desperate desire to preserve humanity. How strange to look at the rigid, cold figure he casts and know all these wild dreams burn inside his head and heart.'},
        {reviewed: true, user_id: 'XIBsbQfPQYZM4QPFIlgId4Wn8KZ2', book_id: 1, highlight: 'In a storm, you don’t tie two boats together. They’ll drag each other down.'},
        {reviewed: true, user_id: 'XIBsbQfPQYZM4QPFIlgId4Wn8KZ2', book_id: 1, highlight: 'In a world of killers, it takes more to be kind than to be wicked. But men like you and me, we’re just passing time before death reaches down for us.'},
        {reviewed: true, user_id: 'XIBsbQfPQYZM4QPFIlgId4Wn8KZ2', book_id: 1, highlight: 'In the words of Lorn au Arcos, if you must only wound the man, you better kill his pride.'},
        {reviewed: true, user_id: 'XIBsbQfPQYZM4QPFIlgId4Wn8KZ2', book_id: 1, highlight: 'Innocent and quiet, like two moths dancing around the same flame.'},
        {reviewed: true, user_id: 'XIBsbQfPQYZM4QPFIlgId4Wn8KZ2', book_id: 1, highlight: 'Mortals who plan die a thousand times. We who obey die but once.'},
        {reviewed: true, user_id: 'XIBsbQfPQYZM4QPFIlgId4Wn8KZ2', book_id: 1, highlight: 'My son, my daughter, now that you bleed, you shall know no fear, no defeat, only victory. Your cowardice seeps from you. Your rage burns bright. Rise, warrior of Gold, and take with you your Color’s might.'},
        {reviewed: true, user_id: 'XIBsbQfPQYZM4QPFIlgId4Wn8KZ2', book_id: 1, highlight: 'Res, non verba.\nEnglish: Actions, not words.'},
        {reviewed: true, user_id: 'XIBsbQfPQYZM4QPFIlgId4Wn8KZ2', book_id: 1, highlight: 'Sad to see how weak and petty the demons of my youth really were.'},
        {reviewed: true, user_id: 'XIBsbQfPQYZM4QPFIlgId4Wn8KZ2', book_id: 1, highlight: 'Slaves do not have the bravery of free men. That is why Golds lie to lowReds and make them think they are brave. That is why they lie to Obsidians and make them think it is an honor to serve gods. Easier than the truth. Yet it takes only one truth to bring a kingdom of lies crashing down.'},
        {reviewed: true, user_id: 'XIBsbQfPQYZM4QPFIlgId4Wn8KZ2', book_id: 1, highlight: 'That is how they train Pinks to live a life of slavery, Darrow. They raise us in the Gardens with implants in our bodies that fill our lives with pain. They call the device Cupid’s Kiss—the burn along the spine, the ache in the head. It never stops. Not even when you close your eyes. Not when you cry. It only stops when you obey. They take the Kiss away eventually. When we’re twelve. But … you can’t know what it’s like, the fear that it’ll come back, Darrow.'},
      ]);
    });
};
