import express from 'express';
import {
    instituteRegister,
    smeRegister,
    instituteLogin
}
const router = express.Router();


router.post('/institute/register',instituteRegister)
router.post('/sme/register', smeRegister);
router.post('/institute/login', instituteLogin);  