const db = require('../config/db');

exports.getAll = async () => {
  const [rows] = await db.query('SELECT * FROM Service WHERE statut = "actif"');
  return rows;
};

exports.getById = async (id) => {
  const [rows] = await db.query('SELECT * FROM Service WHERE id_service = ?', [id]);
  return rows[0];
};

exports.create = async ({ nom_service, description, prix, categorie, image }) => {
  const [result] = await db.query(
    'INSERT INTO Service (nom_service, description, prix, categorie, image, statut) VALUES (?, ?, ?, ?, ?, "actif")',
    [nom_service, description, prix, categorie, image]
  );
  return result.insertId;
};

exports.update = async (id, { nom_service, description, prix, categorie, image }) => {
  await db.query(
    'UPDATE Service SET nom_service=?, description=?, prix=?, categorie=?, image=? WHERE id_service=?',
    [nom_service, description, prix, categorie, image, id]
  );
};

exports.remove = async (id) => {
  await db.query('UPDATE Service SET statut="inactif" WHERE id_service=?', [id]);
};