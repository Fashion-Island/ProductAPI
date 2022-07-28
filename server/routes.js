const router = require('express').Router();
const controller = require('./controller.js')

router.get('/', controller.get);


module.exports = router;