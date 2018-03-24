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
        ),
        knex.raw(
          'INSERT INTO meals (name, created_at,updated_at) VALUES (?, ?, ?)',
          ["breakfast",new Date,new Date]
        ),
        knex.raw(
            'INSERT INTO meals (name, created_at,updated_at) VALUES (?, ?, ?)',
            ["lunch",new Date,new Date]
        ),
        knex.raw(
            'INSERT INTO meals (name, created_at,updated_at) VALUES (?, ?, ?)',
            ["dinner",new Date,new Date]
        ),
        knex.raw(
            'INSERT INTO meals (name, created_at,updated_at) VALUES (?, ?, ?)',
            ["snack",new Date,new Date]
        )
      ])
    })
  }