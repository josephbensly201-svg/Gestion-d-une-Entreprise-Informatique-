const db = require('../config/db');

exports.getAllServices = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM service');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};