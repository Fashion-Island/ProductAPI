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
    let queryStr = `select p.product_id as id, p.name, p.slogan, p.description, p.default_price,
    json_agg(json_build_object('feature', f.feature, 'value',f.value)) as features
    from products as p
    inner join feature as f on p.product_id = f.product_id
    where p.product_id = ${product_id}
    group by p.product_id`;
    // let queryStr1 = `select feature.feature, feature.value from feature where
    // feature.product_id = ${product_id}`;
    product = await db.query(queryStr);
    } catch (err) {
      err = err.stack;
    };
    //console.log("this is product", product)
    callback(err, product.rows[0]);
  },

  getStyle: async (product_id, callback) => {
    let styles, err, updatedStyles, styleData;
    try {
      let queryStr = `select s.style_id, s.name, s.sale_price, s.original_price, s.default_status as "default?",
      json_agg(distinct jsonb_build_object('url',p.url,'thumbnail_url',p.thumbnail_url)) as photos,
      json_object_agg(sk.id, json_build_object('quantity',sk.quantity,'size',sk.size)) as skus
      from styles as s
      inner join photo as p on p.style_id = s.style_id
      inner join skus as sk on sk.style_id = s.style_id
      where s.product_id = ${product_id}
      group by s.style_id`;
      styles = await db.query(queryStr);
      console.log("this is the data", styles);
    } catch (err) {
      err = err.stack;
      console.log(err);
    }
   styles.rows.map(item => {
      if (item["default?"] === 1) {
        return Object.assign(item, {"default?": true})
      } else {
        return Object.assign(item, {"default?": false})
      }
    })
    styleData = {"product_id": product_id, "results": styles.rows}
    callback(err, styleData);
  },

  getRelated: (product_id, callback) => {
    let queryStr = `select json_agg(related_id) as related from related where product_id = ${
      product_id
    }`;
    db.query(queryStr, (err, results) => {
      callback(err, results);
    })
  }
}