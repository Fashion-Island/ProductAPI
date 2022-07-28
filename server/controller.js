const models = require('./models');

module.exports = {
  get: function (req, res) {
    models.getAll ( (err, results) => {
      if (err) {
        console.log('Unable to get data from database', err);
        res.sendStatus(500);
      } else {
        console.log("successfully get data",results.rows);
        res.status(200).send(results.rows);
      }
    })
  }
}