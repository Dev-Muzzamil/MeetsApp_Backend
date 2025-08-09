import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Institution from '../models/Institution.js';
import Sme from '../models/Sme.js';

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};


export const instituteLogin