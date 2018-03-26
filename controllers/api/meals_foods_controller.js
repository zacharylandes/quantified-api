var mealFood =  require('../../models/meal_food.js')
var app =  require('../../app.js')
pry = require('pryjs')


function index(req, res, next){
    mealFood.all(req, res, next) 
}

function create(req,res,next){
    mealFood.create(req,res,next) 
}

function destroy(req,res,next){
    mealFood.destroy(req,res,next) 
}



module.exports = {
    index,
    create,
    destroy
}
