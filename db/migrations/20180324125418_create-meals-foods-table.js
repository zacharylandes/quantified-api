
exports.up = function(knex, Promise) {
    let createQuery = `CREATE TABLE mealfoods(
      id SERIAL PRIMARY KEY NOT NULL,
      meal_id INTEGER,
      food_id INTEGER
    )`
    return knex.raw(createQuery)
  }
  
  exports.down = function(knex, Promise) {
    let dropQuery = `DROP TABLE mealfoods`
    return knex.raw(dropQuery)
  }