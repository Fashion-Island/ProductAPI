const express = require("express");
const { Pool, Client } = require('pg');
let request = require("supertest");
request = request('http://localhost:3000');

describe('Connect database and get data', () => {
  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'products',
    password: 'haozhu123',
    port: 5432,
  });
  pool.connect();

  it ('Should get single product information from database', async (done) => {
    const product_id = 1;
    const response = await request.get(`/products/${product_id}`);
    //console.log("this is data", response.body);
    const queryStr = `select name from products where products.product_id = ${product_id}`;
    const data = await pool.query(queryStr);
    //console.log("this is from query", data.rows[0])
    expect(response.body.name).toEqual(data.rows[0].name);
    done();
  })

  it ('Should get related product information from database', async (done) => {
    const product_id = 1;
    const response = await request.get(`/products/${product_id}/related`);
    //console.log("this is data", response.body);
    const queryStr = `select json_agg(related_id) as related from related where product_id = ${
      product_id
    }`;
    const data = await pool.query(queryStr);
    //console.log("this is from query", data.rows[0])
    expect(response.body).toEqual(data.rows[0].related);
    done();

    pool.end();
  })


})

