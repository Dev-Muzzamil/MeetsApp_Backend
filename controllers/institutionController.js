const Institution = require('../models/Institution');

// Get institution profile
exports.getInstitutionProfile = async (req, res) => {
  try {
    const institution = await Institution.findById(req.params.id);
    if (!institution) return res.status(404).json({ message: 'Institution not found' });
    res.json(institution);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getAllInstitutions = async (req, res) => {
  try {
    const institutions = await Institution.find();
    res.json(institutions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};