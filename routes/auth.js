const express = require('express');
const {
    instituteRegister,
    smeRegister,
    instituteLogin,
    smeLogin
} = require('../controllers/authController');

const router1 = express.Router();

router1.post('/institute/register', instituteRegister);
router1.post('/sme/register', smeRegister);
router1.post('/institute/login', instituteLogin);
router1.post('/sme/login', smeLogin);

module.exports = router1;
