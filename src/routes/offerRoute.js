
const express = require('express');
const router = express.Router();

const offerController = require('../controllers/offerController');



router.get('/list', offerController.list );
router.post('/create', offerController.create);



module.exports = router;