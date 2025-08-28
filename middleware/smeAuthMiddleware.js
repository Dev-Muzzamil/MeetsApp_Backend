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

// Middleware to restrict access to only the logged-in SME
export const authorizeSME = (req, res, next) => {
  const tokenSmeId = req.user.id;
  const requestedSmeId = req.params.smeId || req.body.smeId;
  if (tokenSmeId !== requestedSmeId) {
    return res.status(403).json({ message: 'Forbidden: Access denied' });
  }
  next();
};
