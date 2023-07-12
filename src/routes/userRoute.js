
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');




router.post('/create', userController.create);
router.get('/list', userController.list );



module.exports = router;