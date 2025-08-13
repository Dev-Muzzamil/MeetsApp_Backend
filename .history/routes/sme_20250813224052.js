import express from 'express';

const router = express.Router();

router.post('/register/:eventid', async (req, res) => {
  const { eventid } = req.params;
  const { smeId, smeName, smeEmail } = req.body;

  try {
    // Assuming you have a function to register an SME for an event
    const registration = await registerSmeForEvent(eventid, smeId, smeName, smeEmail);
    
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
});
