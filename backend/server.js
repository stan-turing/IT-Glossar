const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Beispiel-Daten (IT-Begriffe)
const begriffe = [
    { id: 1, name: 'Phishing', beschreibung: 'Ein Cyberangriff, der Benutzer täuscht, um sensible Daten preiszugeben.' },
    { id: 2, name: 'Firewall', beschreibung: 'Ein System, das unbefugten Zugriff auf ein Netzwerk verhindert.' }
];

// GET-Endpunkt: Gibt alle Begriffe zurück
app.get('/begriffe', (req, res) => {
    res.json(begriffe);
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
