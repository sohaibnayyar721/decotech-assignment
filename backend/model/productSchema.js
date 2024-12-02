const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  color: String,
  price: Number,
  size: String,
  details: String,
  pictures: Array
  
});

const productModel = mongoose.model('products', productSchema)

module.exports = productModel;