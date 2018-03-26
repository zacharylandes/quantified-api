
export const food =  {
    all:  function(){database.raw(
        'SELECT * FROM foods WHERE id=?',[id])
        .then(function(food) {
          if(!food.rows) {
           return res.sendStatus(404)
          }
          else {
           res.json(food.rows)
          }
      })
    }
}