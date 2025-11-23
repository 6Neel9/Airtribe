// src/middlewares/role.middleware.js
const requireRole = (role) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
  if (req.user.role === role || req.user.role === 'admin') return next();
  return res.status(403).json({ message: 'Forbidden - insufficient role' });
};

module.exports = { requireRole };
