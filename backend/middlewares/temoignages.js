const db = require('../config/db');

exports.create = async (id_client, { commentaire, note }) => {
  const [result] = await db.query(
    'INSERT INTO Temoignage (id_client, commentaire, note, date) VALUES (?, ?, ?, NOW())',
    [id_client, commentaire, note]
  );
  return result.insertId;
};

exports.getAll = async () => {
  const [rows] = await db.query(
    `SELECT t.id_temoignage, t.commentaire, t.note, t.date, u.nom, u.prenom
     FROM Temoignage t
     JOIN Client c ON t.id_client = c.id_client
     JOIN Utilisateur u ON c.id_utilisateur = u.id_utilisateur
     ORDER BY t.date DESC`
  );
  return rows;
};

exports.remove = async (id_temoignage) => {
  await db.query('DELETE FROM Temoignage WHERE id_temoignage = ?', [id_temoignage]);
};