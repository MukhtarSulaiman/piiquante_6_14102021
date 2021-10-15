const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');
const multer = require('../middleware/multer-config')

router.post('/', multer, sauceCtrl.createSauce);


module.exports = router;

