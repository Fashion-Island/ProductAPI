const db = require('./database/index.js');

module.exports = {
  getAll: (callback) => {
    let queryStr = 'select * from products limit 5';
    db.query(queryStr, (err, results) => {
      callback(err, results);
    })
  },

  //getstyle
}