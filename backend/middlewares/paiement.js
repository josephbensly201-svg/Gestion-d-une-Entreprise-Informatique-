const db = require('../config/db');

exports.create = async ({ id_commande, montant, mode_paiement, transaction_id }) => {
  const [result] = await db.query(
    `INSERT INTO Paiement (id_commande, montant, mode_paiement, transaction_id, date_paiement, statut)
     VALUES (?, ?, ?, ?, NOW(), "complete")`,
    [id_commande, montant, mode_paiement, transaction_id]
  );
  return result.insertId;
};

exports.getByClient = async (id_client) => {
  const [rows] = await db.query(
    `SELECT p.* FROM Paiement p
     JOIN Commande c ON p.id_commande = c.id_commande
     WHERE c.id_client = ? ORDER BY p.date_paiement DESC`,
    [id_client]
  );
  return rows;
};