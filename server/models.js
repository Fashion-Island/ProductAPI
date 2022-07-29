const db = require('./database/index.js');

module.exports = {
  getAll: (callback) => {
    let queryStr = 'select * from products limit 5';
    db.query(queryStr, (err, results) => {
      callback(err, results.rows);
    })
  },

  getOne: async (product_id, callback) => {
    //console.log("i am in side models")
    let product,feature, err;
    try {
    let queryStr = `select * from products where product_id = ${product_id}`;
    let queryStr1 = `select feature.feature, feature.value from feature where
    feature.product_id = ${product_id}`;

    product = await db.query(queryStr);
    feature = await db.query(queryStr1);
    } catch (err) {
      err = err.stack;
    };
    console.log([product.rows, feature.rows])
    let productData = product.rows[0];
    productData.feature = feature.rows;
    callback(err, productData);
  },

  getStyle: async (product_id, callback) => {
    let styles, err;
    try {
      let queryStr = `select s.style_id, s.name, s.sale_price, s.original_price, s.default_status,
      json_agg(json_build_object('url',p.url,'thumbnail_url',p.thumbnail_url)) as photo
      from styles as s
      inner join photo as p
      on p.style_id = s.style_id
      where s.product_id = ${product_id}
      group by s.style_id, p.url`;
      styles = await db.query(queryStr);
      console.log("this is the data", styles);
    } catch (err) {
      err = err.stack;
      console.log(err);
    }
    callback(err, styles);

  },

  // getStyle: (product_id, callback) => {
  //   let queryStr = `select * from styles where product_id = ${
  //     product_id
  //   }`;
  //   db.query(queryStr, (err, results) => {
  //     callback(err, results);
  //   })
  // },

  getRelated: (product_id, callback) => {
    let queryStr = `select * from related where product_id = ${
      product_id
    }`;
    db.query(queryStr, (err, results) => {
      callback(err, results);
    })
  }
}