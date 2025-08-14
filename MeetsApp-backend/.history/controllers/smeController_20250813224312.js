import Event from '../models/Event.js';
import Sme from '../models/Sme.js';

export const registerEvent=async (req, res) => {
  const { eventid } = req.params;
  const { smeId, smeName, smeEmail } = req.body;

  try {


    res.status(201).json({
      success: true,
      message: 'SME registered successfully',
      data: registration
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server Error'
    });
  }
}