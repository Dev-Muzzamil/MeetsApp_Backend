import express from 'express';
import { registerEvent } from '../controllers/smeController.js';

const router = express.Router();

router.post('/register/:eventid', registerEvent);
