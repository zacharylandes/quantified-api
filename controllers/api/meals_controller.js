var meal =  require('../../models/meal.js')
var app =  require('../../app.js')
pry = require('pryjs')


function index(req, res, next){
    meal.all(req, res, next) 
}



module.exports = {index}
