var foodsController = require('../../controllers/api/foods_controller.js')
var express = require('express');
var router  = express.Router();
var environment   = process.env.NODE_ENV || 'development'
var configuration = require('../../knexfile')[environment]
var database      = require('knex')(configuration)

router.get('/', function(req,res,next){
  foodsController.index(req, res, next)
})

router.post('/', function(req,res,next){
  foodsController.create(req, res, next)
})

router.delete('/:id', function(req,res,next){
  foodsController.destroy(req, res, next)
})

router.put('/:id', function(req,res,next){
  foodsController.update(req, res, next)
})

module.exports = router;