const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StockSchema = new Schema ({
  id: {
    type: Number,
    required: true,
    unique:true
  },
  name:String,
  desc:String,
  data:[]



});
const Stock = mongoose.model('stock', StockSchema);

module.exports = Stock;
