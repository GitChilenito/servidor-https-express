const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();
const PUERTO = process.env.PORT || 8080;

app.use(express.json());

let opcionesSSL;
try {
  opcionesSSL = {
    key: fs.readFileSync(path.join(__dirname, 'certs', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'certs', 'cert.pem'))
  };
  console.log('✅ Certificados SSL/TLS cargados correctamente.');
} catch (error) {
  console.error('❌ Error al cargar certificados:', error.message);
  process.exit(1);
}

app.get('/', (req, res) => {
  res.status(200).json({
    estado: 'Exitoso',
    mensaje: 'Conexión cifrada establecida correctamente mediante protocolo HTTPS.',
    protocolo: req.protocol.toUpperCase(),
    seguro: req.secure
  });
});

const servidorHTTPS = https.createServer(opcionesSSL, app);

servidorHTTPS.listen(PUERTO, () => {
  console.log(`🚀 Servidor HTTPS escuchando en: https://localhost:${PUERTO}`);
});// Servidor HTTPS configurado correctamente
