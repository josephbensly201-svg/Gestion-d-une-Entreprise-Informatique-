const db = require('../config/db');

exports.create = async ({ nom, prenom, email, telephone, sujet, message }) => {
  const [result] = await db.query(
    `INSERT INTO Contact (nom, prenom, email, telephone, sujet, message, date_message)
     VALUES (?, ?, ?, ?, ?, ?, NOW())`,
    [nom, prenom, email, telephone, sujet, message]
  );
  return result.insertId;
};

exports.getAll = async () => {
  const [rows] = await db.query('SELECT * FROM Contact ORDER BY date_message DESC');
  return rows;
};