const db = require('../config/db');

exports.findByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM Utilisateur WHERE email = ?', [email]);
  return rows[0];
};

exports.findById = async (id) => {
  const [rows] = await db.query('SELECT * FROM Utilisateur WHERE id_utilisateur = ?', [id]);
  return rows[0];
};

exports.getAll = async () => {
  const [rows] = await db.query('SELECT id_utilisateur, nom, prenom, email, role, statut FROM Utilisateur');
  return rows;
};

exports.updateProfil = async (id, { nom, prenom, telephone, adresse }) => {
  await db.query(
    'UPDATE Utilisateur SET nom=?, prenom=?, telephone=?, adresse=? WHERE id_utilisateur=?',
    [nom, prenom, telephone, adresse, id]
  );
};

exports.updateStatut = async (id, statut) => {
  await db.query('UPDATE Utilisateur SET statut=? WHERE id_utilisateur=?', [statut, id]);
};