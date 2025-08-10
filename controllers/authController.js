const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Institution = require('../models/Institution.js');
const Sme = require('../models/Sme');
const Institutions = require('../models/Institution.js');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

const instituteLogin = async (req, res) => {
  try {
    // TODO: Implement login logic
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const instituteRegister = async (req, res) => {
  const { name, email, password, location, type, description, coordinates } = req.body;

  if (!name || !email || !password || !coordinates) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }

  try {
    const existingInstitution = await Institutions.findOne({ email });
    if (existingInstitution) {
      return res.status(400).json({ message: 'Institution already exists' });
    }

    const institution = new Institutions({
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
};

const smeRegister = async (req, res) => {
  const { name, email, password, expertise, qualifications, institute } = req.body;

  if (!name || !email || !password || !expertise || !qualifications) {
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
      token: generateToken(sme._id, 'sme')
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const smeLogin = async (req, res) => {
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
      token: generateToken(sme._id, 'sme')
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  instituteLogin,
  instituteRegister,
  smeRegister,
  smeLogin
};
