exports.seed = function(knex, Promise) {
    return knex.raw('TRUNCATE foods RESTART IDENTITY')
    .then(function() {
      return Promise.all([
        knex.raw(
          'INSERT INTO foods (name, calories) VALUES (?, ?)',
          ["bananas",120]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories) VALUES (?, ?)',
          ["tacos",220]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories) VALUES (?, ?)',
          ["burritos",620]
        )
      ])
    })
  }