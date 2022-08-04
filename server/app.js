require('dotenv').config();
const express = require('express');
const db = require('./database');
const router = require('./routes.js')

let app = express();
app.use(express.json()); //to parse
app.use(express.static(__dirname + '/../client/dist')); //to serve client
app.use('/products', router);

const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`server listening on PORT: ${PORT}`);
});

module.exports.app = app;




