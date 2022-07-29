const models = require('./models');

module.exports = {
  get: function (req, res) {
    models.getAll ( (err, results) => {
      if (err) {
        console.log('Unable to get data from database', err);
        res.sendStatus(500);
      } else {
        console.log("successfully get data",results);
        res.status(200).send(results);
      }
    })
  },

  getOne: function (req, res) {
    let product_id = req.params.product_id;
    console.log("this is id", product_id)
    // models.getOne(product_id, () => {console.log("i am the call back")})
    // res.end();

    models.getOne (product_id, (err, results) => {
      if (err) {
        console.log('Unable to get data from database', err);
        res.sendStatus(500);
      } else {
        console.log("successfully get single product",results);
        res.status(200).send(results);
      }
    })
  },

  getStyle: function (req, res) {
    let product_id = req.params.product_id;
    models.getStyle (product_id, (err, results) => {
      if (err) {
        console.log('Unable to get data from database', err);
        res.sendStatus(500);
      } else {
        console.log("successfully get single product styles",results);
        res.status(200).send(results);
      }
    })
  },

  getRelated: function (req, res) {
    let product_id = req.params.product_id;
    models.getRelated (product_id, (err, results) => {
      if (err) {
        console.log('Unable to get data from database', err);
        res.sendStatus(500);
      } else {
        // console.log("successfully get single product styles",results.rows);
        //process res data
        let relatedId = results.rows.map(item => item.related_id);
        res.status(200).send(relatedId);
      }
    })
  }
}