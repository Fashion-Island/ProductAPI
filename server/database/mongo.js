const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

//dotenv.config()  update if there is .env file

mongoose.connect('mongodb://localhost',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
    },(err, client) => {
        if (err) {
          return console.log('unable to conncect to database')
        }
      console.log('successfuly connected')
});

const productSchema = new mongoose.Schema({
  id: {type: Number, required: true},
  name: {type: String, required: true},
  slogan: {type: String, required: true},
  description: {type: String, required: true},
  category: {type: String, required: true},
  features: []
})

const Product = mongoose.model('Product', productSchema);

module.exports.Product = Product;