const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const serviceRoutes = require('./routes/serviceRoutes');
app.use('/api/services', serviceRoutes);

const autoRoutes = require('./routes/autoRoutes');
app.use('/api/autos', autoRoutes);

const contactRoutes = require('./routes/contactRoutes');
app.use('/api/contacts', contactRoutes);

const db = require("./config/db");

db.query('SELECT 1')
.then(() => console.log('connexion à la base de données réussie'))
.catch((err) => console.error('Erreur de connexion à la base de données :', err.message));

app.get('/',(req, res) => {
    res.send('l\'API fonctionne correctement');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});