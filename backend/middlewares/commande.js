const db = require('../config/db');

exports.create = async (id_client, montant_total) => {
  const [result] = await db.query(
    'INSERT INTO Commande (id_client, date_commande, montant_total, statut) VALUES (?, NOW(), ?, "en_attente")',
    [id_client, montant_total]
  );
  return result.insertId;
};

exports.addDetail = async (id_commande, id_service, quantite, prix) => {
  await db.query(
    'INSERT INTO Detail_Commande (id_commande, id_service, quantite, prix) VALUES (?, ?, ?, ?)',
    [id_commande, id_service, quantite, prix]
  );
};

exports.getByClient = async (id_client) => {
  const [rows] = await db.query('SELECT * FROM Commande WHERE id_client = ? ORDER BY date_commande DESC', [id_client]);
  return rows;
};

exports.updateStatut = async (id_commande, statut) => {
  await db.query('UPDATE Commande SET statut=? WHERE id_commande=?', [statut, id_commande]);
};