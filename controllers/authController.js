import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Institution from '../models/Institution.js';
import Sme from '../models/Sme.js';

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

export const instituteRegister = async (req, res) => {
  const { name, email, password, location, type, description, coordinates } = req.body;

  if (!name || !email || !password || !coordinates) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }

  try {
    const existingInstitution = await Institution.findOne({ email });
    if (existingInstitution) {
      return res.status(400).json({ message: 'Institution already exists' });
    }

    const institution = new Institution({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      location,
      type,
      description,
      coordinates
    });

    await institution.save();

    res.status(201).json({
      _id: institution._id,
      name: institution.name,
      email: institution.email,
      token: generateToken(institution._id, 'institution')
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const smeRegister = async (req, res) => {
  let { name, email, password, expertise, qualifications, institute } = req.body;

  // Accept comma-separated strings or arrays from frontend
  if (typeof expertise === 'string') {
    expertise = expertise.split(',').map(e => e.trim()).filter(Boolean);
  }
  if (typeof qualifications === 'string') {
    qualifications = qualifications.split(',').map(q => q.trim()).filter(Boolean);
  }

  if (!name || !email || !password || !Array.isArray(expertise) || expertise.length === 0 || !Array.isArray(qualifications) || qualifications.length === 0) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }

  try {
    const existingSme = await Sme.findOne({ email });
    if (existingSme) {
      return res.status(400).json({ message: 'SME already exists' });
    }

    const sme = new Sme({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      expertise,
      qualifications,
      institute
    });

    await sme.save();

    res.status(201).json({
      _id: sme._id,
      name: sme.name,
      email: sme.email,
      expertise: sme.expertise,
      qualifications: sme.qualifications,
      token: generateToken(sme._id, 'sme')
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const instituteLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }

  try {
    const institution = await Institution.findOne({ email });
    if (!institution || !(await bcrypt.compare(password, institution.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      _id: institution._id,
      name: institution.name,
      email: institution.email,
      token: generateToken(institution._id, 'institution')
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const smeLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }

  try {
    const sme = await Sme.findOne({ email });
    if (!sme || !(await bcrypt.compare(password, sme.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      _id: sme._id,
      name: sme.name,
      email: sme.email,
      expertise: sme.expertise,
      qualifications: sme.qualifications,
      token: generateToken(sme._id, 'sme')
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}