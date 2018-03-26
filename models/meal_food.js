var express = require('express');
var router  = express.Router();
var environment   = process.env.NODE_ENV || 'development'
var configuration = require('../knexfile')[environment]
var database      = require('knex')(configuration)
pry = require('pryjs')

var mealFood = {
    all:  function(req, res, next){
        var meal_id = req.params.meal_id
        database.raw('SELECT foods.id, foods. name, foods.calories FROM foods INNER JOIN mealfoods on foods.id= mealfoods.food_id WHERE mealfoods.meal_id=?',
        [meal_id])
        .then(function(meals){
            if(!meals.rows) {
                return res.sendStatus(404)
            } else {
                res.send(meals.rows)
            }
        })
    },
    create: function(req,res,next){
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
    },
    destroy: function(req,res,next){
        var meal_id = req.params.meal_id
        var food_id = req.params.food_id
         database.raw('DELETE FROM mealfoods WHERE mealfoods.meal_id = ? AND mealfoods.food_id = ?',
          [meal_id,food_id]
        ).then(function(food){
             res.send(food)
        })
    }
}
module.exports = mealFood