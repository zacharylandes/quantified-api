var express = require('express');
var router  = express.Router();
var environment   = process.env.NODE_ENV || 'development'
var configuration = require('../../knexfile')[environment]
var database      = require('knex')(configuration)
pry = require('pryjs')

router.get('/:id/foods', function(req, res, next) {
    var id = req.params.id
    database.raw(
      'SELECT  "foods".* FROM "foods" INNER JOIN "mealfoods" ON "foods"."id" = "mealfoods"."food_id" WHERE "mealfoods"."meal_id" = ?',
      [id]
    ).then(function(meals) {
      if(!meals.rows) {
        return res.sendStatus(404)
      } else {
        res.json(meals.rows)
      }
    })
  })

router.post('/:meal_id/foods/:food_id', function(req, res, next) {
    var id = req.params.id
    var meal_id = req.params.meal_id
    var food_id = req.params.food_id
    database.raw('INSERT INTO mealfoods (meal_id, food_id) VALUES (?,?) RETURNING *',
    [meal_id,food_id])
    .then(function(meals) {
        if(!meals.rows) {
            return res.sendStatus(404)
        } else {
        res.json(meals.rows)
      }
    })
  })

router.get('/:meal_id/foods/', function(req, res, next) {
    var meal_id = req.params.meal_id
    database.raw('SELECT foods.id, foods. name, foods.calories FROM foods INNER JOIN mealfoods on foods.id= mealfoods.food_id WHERE mealfoods.meal=?',
    [meal_id])
    .then(function(meals) {
        if(!meals.rows) {
            return res.sendStatus(404)
        } else {
            res.send('meal updated')
        }
    })
  })


router.get('/', function(req, res, next) {
    return database.raw('SELECT * FROM meals;')
    .then((meals) => {
      return Promise.all(
        meals.rows.map(function(meal) {
          let id = meal.id
          return database.raw('SELECT meals.id, meals.name, foods.* from meals JOIN mealfoods ON meals.id = mealfoods.meal_id JOIN foods ON foods.id = mealfoods.food_id WHERE meals.id = ?;', [id])
          .then(foods => {
            return {id: meal.id, name: meal.name, foods: foods.rows}
          })
        })
      )
      .then(allmeals => {
        res.status(201).json(allmeals)
       })
    })
})

router.post('/', function(req, res, next) {
  var name = req.body.name
  var calories = req.body.calories

  if(!name || !calories) {
    return res.status(422).send({
      error: "No meal provided"
    })
  }
  database.raw(
    'INSERT INTO meals(name) VALUES (?) RETURNING *',
    [name]
  ).then(function(meal) {
      res.status(201).json(meal.rows)
  })
})


router.delete('/:meal_id/foods/:food_id', function(req, res, next) {
    var meal_id = req.params.meal_id
    var food_id = req.params.food_id
     database.raw('DELETE FROM mealfoods WHERE mealfoods.meal_id = ? AND mealfoods.food_id = ?',
      [meal_id,food_id]
    ).then(function(food){
         res.send(food)
    })
})

module.exports = router;