const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// INSCRIPTION
exports.register = async (req, res) => {
  try {
    const { nom, prenom, email, mot_de_passe, telephone, adresse } = req.body;
    // Verifye si email deja egziste
    const [existant] = await db.query(
      'SELECT * FROM Utilisateur WHERE email = ?', [email]
    );
    if (existant.length > 0) {
      return res.status(400).json({ message: 'Email deja itilize' });
    }
    // Kripte mo de pas la
    const hashPassword = await bcrypt.hash(mot_de_passe, 10);
    // Ensere itilizatè a (role default: client)
    const [result] = await db.query(
      `INSERT INTO Utilisateur (nom, prenom, email, mot_de_passe, telephone, adresse, role, date_creation, statut)
       VALUES (?, ?, ?, ?, ?, ?, 'client', NOW(), 'actif')`,
      [nom, prenom, email, hashPassword, telephone, adresse]
    );
    // Kreye tou yon antre nan tab Client
    await db.query(
      'INSERT INTO Client (id_utilisateur, entreprise, ville, pays) VALUES (?, ?, ?, ?)',
      [result.insertId, req.body.entreprise || null, req.body.ville || null, req.body.pays || null]
    );

    res.status(201).json({ message: 'compte cree avec succes', id_utilisateur: result.insertId });

  } catch (err) {
    res.status(500).json({ message: 'Erreue du serveur', erreur: err.message });
  }
};
// KONEKSYON
exports.login = async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;
    const [rows] = await db.query(
      'SELECT * FROM Utilisateur WHERE email = ?', [email]
    );
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Email invalide' });
    }
    const utilisateur = rows[0];
    const motDePasseValid = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);
    if (!motDePasseValid) {
      return res.status(401).json({ message: 'Mot de passe invalide' });
    }
    // Kreye token JWT
    const token = jwt.sign(
      { id: utilisateur.id_utilisateur, role: utilisateur.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.json({
      message: 'connexion reussie',
      token,
      utilisateur: { id: utilisateur.id_utilisateur, nom: utilisateur.nom, role: utilisateur.role }
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur du serveur', erreur: err.message });
  }
};