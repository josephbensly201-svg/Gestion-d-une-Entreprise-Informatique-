const db = require('../config/db');

exports.create = async (id_utilisateur, { entreprise, ville, pays }) => {
  const [result] = await db.query(
    'INSERT INTO Client (id_utilisateur, entreprise, ville, pays) VALUES (?, ?, ?, ?)',
    [id_utilisateur, entreprise, ville, pays]
  );
  return result.insertId;
};

exports.findByUtilisateurId = async (id_utilisateur) => {
  const [rows] = await db.query(
    'SELECT * FROM Client WHERE id_utilisateur = ?', [id_utilisateur]
  );
  return rows[0];
};

exports.getAll = async () => {
  const [rows] = await db.query(
    `SELECT c.id_client, c.entreprise, c.ville, c.pays,
            u.nom, u.prenom, u.email, u.telephone, u.statut
     FROM Client c
     JOIN Utilisateur u ON c.id_utilisateur = u.id_utilisateur`
  );
  return rows;
};

exports.update = async (id_client, { entreprise, ville, pays }) => {
  await db.query(
    'UPDATE Client SET entreprise=?, ville=?, pays=? WHERE id_client=?',
    [entreprise, ville, pays, id_client]
  );
};