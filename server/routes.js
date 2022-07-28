const router = require('express').Router();
const controller = require('./controller.js')

router.get('/', controller.get);
router.get('/:product_id', controller.getOne);
router.get('/:product_id/styles', controller.getStyle)
router.get('/:product_id/related', controller.getRelated)


module.exports = router;