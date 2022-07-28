const db = require('./database/index.js');

module.exports = {
  getAll: (callback) => {
    let queryStr = 'select * from products limit 5';
    db.query(queryStr, (err, results) => {
      callback(err, results);
    })
  },

  //getstyle
  getOne: (product_id, callback) => {
    //console.log("i am in side models")
    let queryStr = `select * from products where product_id = ${product_id}`;
    db.query(queryStr, (err, results) => {
      callback(err, results);
    })
  },

  getStyle: (product_id, callback) => {
    let queryStr = `select * from styles where product_id = ${
      product_id
    }`;
    db.query(queryStr, (err, results) => {
      callback(err, results);
    })
  },

  getRelated: (product_id, callback) => {
    let queryStr = `select * from related where product_id = ${
      product_id
    }`;
    db.query(queryStr, (err, results) => {
      callback(err, results);
    })
  }
}