const express= require('express');
const router = express.Router();
const Stock = require('../models/stock');

//get all
router.get('/stock', function(req, res, next){
  Stock.find({}).then(function(result){
    res.send(result);
  }).catch(next);
});



//get single poll

router.post('/stock', function(req, res, next){
  console.log("Requested post", req.body);
  Stock.create(req.body).then(function(Product){
    res.send(Product);
  }).catch(next)
});

router.delete('/stock/:id', function(req, res, next){
  Stock.deleteOne({id: req.params.id}).catch(next);
})



module.exports = router;
