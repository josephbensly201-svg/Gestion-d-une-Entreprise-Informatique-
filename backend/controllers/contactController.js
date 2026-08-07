const db = require('../config/db');

// Voye yon mesaj (piblik — nenpòt vizitè ka voye)
exports.envoyerMessage = async (req, res) => {
  try {
    const { nom, prenom, email, telephone, sujet, message } = req.body;

    await db.query(
      'INSERT INTO Contact (nom, prenom, email, telephone, sujet, message, date_message) VALUES (?, ?, ?, ?, ?, ?, NOW())',
      [nom, prenom, email, telephone, sujet, message]
    );

    res.status(201).json({ message: 'Message envoyé avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Jwenn tout mesaj yo (admin sèlman)
exports.getAllMessages = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Contact ORDER BY date_message DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};