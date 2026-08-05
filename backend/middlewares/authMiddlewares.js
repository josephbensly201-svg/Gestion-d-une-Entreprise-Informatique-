const jwt = require('jsonwebtoken');

// Verifye si itilizatè a konekte (gen yon token valid)
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Aksè refize, pa gen token' });
  }

  // Header la gen fòm: "Bearer xxxxxxx"
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token envalid' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.utilisateur = decoded; // { id, role } ap disponib nan tout controller apre sa
    next(); // kontinye vè controller a
  } catch (err) {
    return res.status(403).json({ message: 'Token pa valid oswa ekspire' });
  }
};

// Verifye si itilizatè a se yon admin
exports.verifyAdmin = (req, res, next) => {
  if (req.utilisateur.role !== 'admin') {
    return res.status(403).json({ message: 'Aksè refize, sèlman admin' });
  }
  next();
};