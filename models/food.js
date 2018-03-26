var express = require('express');
var router  = express.Router();
var environment   = process.env.NODE_ENV || 'development'
var configuration = require('../knexfile')[environment]
var database      = require('knex')(configuration)
pry = require('pryjs')

var food = {
    all:  function(req, res, next){
        return database.raw('SELECT * FROM foods')
        .then(function(food) {
          if(!food.rows) {
            return res.sendStatus(404)
          }
          else {
            return res.json(food.rows)
          }
      })
    },
    
    create: function(req,res,next){
        var name = req.body.name
        var calories = req.body.calories
        if(!name || !calories) {
          return res.status(422).send({
            error: "No food provided"
          })
        }
        database.raw(
          'INSERT INTO foods(name, calories) VALUES (?, ?) RETURNING *',
          [name, calories]
        ).then(function(food) {
            res.status(201).json(food.rows)
        })
    },

    update: function(req,res,next){
        var id = req.params.id
        var name = req.body.name
        var calories = req.body.calories

        database('foods')
        .where('id', '=', id)
        .update({
        name: name,
        calories: calories
        }).then(function(food){
            res.send('Food updated')
       })
    },

    destroy: function(req,res,next){
        var id = req.params.id
        database.raw(
          'DELETE FROM foods WHERE id=?',
          [id]
        ).then(function(food){
             res.send('Food deleted')
        })
    }
}

module.exports = food