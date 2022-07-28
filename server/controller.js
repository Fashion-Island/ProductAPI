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
        console.log("successfully get single product",results.rows);
        res.status(200).send(results.rows);
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
        console.log("successfully get single product styles",results.rows);
        res.status(200).send(results.rows);
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