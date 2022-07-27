const express = require('express');
const db = require('./database');
const router = require('./routes.js')

let app = express();
app.use(express.json()); //to parse
app.use(express.static(__dirname + '/../client/dist')); //to serve client
app.use('/products', router);

app.set('port', 3000);
if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}

module.exports.app = app;




