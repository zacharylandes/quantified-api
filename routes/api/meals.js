var express = require('express');
var router  = express.Router();
var mealsController = require('../../controllers/api/meals_controller.js')
var mealFoodsController = require('../../controllers/api/meals_foods_controller.js')

var environment   = process.env.NODE_ENV || 'development'
var configuration = require('../../knexfile')[environment]
var database      = require('knex')(configuration)
pry = require('pryjs')


router.post('/:meal_id/foods/:food_id', function(req, res, next) {
  mealFoodsController.create(req, res, next)
})

router.get('/:meal_id/foods/', function(req, res, next) {
  mealFoodsController.index(req, res, next)
})

router.get('/', function(req,res,next){
  mealsController.index(req, res, next)
})
  
router.get('/:meal_id/foods/', function(req,res,next){
  mealFoodsController.index(req, res, next)
})

router.delete('/:meal_id/foods/:food_id', function(req, res, next) {
  mealFoodsController.destroy(req, res, next)
})



module.exports = router;