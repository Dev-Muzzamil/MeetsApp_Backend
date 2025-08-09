import express from 'express';
import {
    instituteRegister,
    smeRegister,
    instituteLogin,
    smeLogin
} from 
const router = express.Router();


router.post('/institute/register',instituteRegister)
router.post('/sme/register', smeRegister);
router.post('/institute/login', instituteLogin);
router.post('/sme/login', smeLogin);  