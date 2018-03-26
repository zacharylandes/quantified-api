var food =  require('../../models/food.js')
var app =  require('../../app.js')
pry = require('pryjs')


function index(req, res, next){
    food.all(req, res, next) 
}

function create(req,res,next){
    food.create(req,res,next) 
}
var update = function(req,res,next){
    food.update(req,res,next)
}

function destroy(req,res,next){
    food.destroy(req,res,next) 
}



module.exports = {
    index,
    create,
    update,
    destroy
}
