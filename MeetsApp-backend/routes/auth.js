import express from 'express';
import {
    instituteRegister,
    smeRegister,
    instituteLogin,
    smeLogin
} from '../controllers/authController.js';
const router = express.Router();

router.post('/institute/register',instituteRegister)
router.post('/sme/register', smeRegister);
router.post('/institute/login', instituteLogin);
router.post('/sme/login', smeLogin);  

export default router;  