import jwt from 'jsonwebtoken';

// Middleware to verify JWT and attach user info to req.user
export const protect = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

// Middleware to restrict access to only the logged-in institute
export const authorizeInstitute = (req, res, next) => {
  const tokenInstituteId = req.user.id;
  const requestedInstituteId = req.params.institutionId || req.params.id || req.body.instituteId;
  
  console.log('=== Authorization Debug ===');
  console.log('Request URL:', req.originalUrl);
  console.log('Request Method:', req.method);
  console.log('Token Institute ID:', tokenInstituteId);
  console.log('Token Institute ID type:', typeof tokenInstituteId);
  console.log('Requested Institute ID:', requestedInstituteId);
  console.log('Requested Institute ID type:', typeof requestedInstituteId);
  console.log('req.params:', req.params);
  console.log('req.user:', req.user);
  console.log('Are they equal?', tokenInstituteId == requestedInstituteId);
  console.log('Are they strictly equal?', tokenInstituteId === requestedInstituteId);
  console.log('String comparison:', String(tokenInstituteId) === String(requestedInstituteId));
  console.log('========================');
  
  if (String(tokenInstituteId) !== String(requestedInstituteId)) {
    console.log('❌ Authorization FAILED - Access denied');
    return res.status(403).json({ message: 'Forbidden: Access denied' });
  }
  
  console.log('✅ Authorization PASSED');
  next();
};
