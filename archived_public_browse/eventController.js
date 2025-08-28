// Archived public event browsing logic from eventController.js
// Original getAllPublicEvents implementation:
//
// export const getAllPublicEvents = async (req, res) => {
//   try {
//     const events = await Event.find()
//       .populate('institution', 'name location type')
//       .sort({ createdAt: -1 });
//     res.json(events);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
