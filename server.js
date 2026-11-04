// ====================================================================
// SERVIDOR WEB HTTP PARA PRODUCCIÓN (RAILWAY / DOCKER / NODE.JS)
// Tecnólogo en Producción de Contenidos 3D - SENA
// ====================================================================

const http = require('http');
const fs = require('fs');
const path = require('path');

// Railway y la mayoría de plataformas PaaS inyectan la variable PORT
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // Requerido para escuchar tráfico externo en contenedores
const BASE_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.csv': 'text/csv; charset=utf-8',
  '.xls': 'application/vnd.ms-excel',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.pdf': 'application/pdf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  // Manejo de métodos
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
    return;
  }

  // Parsear URL limpia
  let reqUrl = req.url.split('?')[0];
  if (reqUrl === '/') reqUrl = '/index.html';

  // Sanitizar ruta para prevenir Directory Traversal (seguridad)
  const safePath = path.normalize(path.join(BASE_DIR, reqUrl));
  if (!safePath.startsWith(BASE_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  fs.stat(safePath, (err, stats) => {
    let filePath = safePath;

    // Si es un directorio, buscar index.html
    if (!err && stats.isDirectory()) {
      filePath = path.join(safePath, 'index.html');
    }

    fs.readFile(filePath, (readErr, data) => {
      if (readErr) {
        // Fallback SPA: Si no se encuentra un archivo específico, servir index.html
        fs.readFile(path.join(BASE_DIR, 'index.html'), (spaErr, spaData) => {
          if (spaErr) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('404 Not Found');
          } else {
            res.writeHead(200, {
              'Content-Type': 'text/html; charset=utf-8',
              'Cache-Control': 'no-cache'
            });
            res.end(spaData);
          }
        });
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      // Control de caché inteligente
      const headers = {
        'Content-Type': contentType,
        'X-Content-Type-Options': 'nosniff'
      };

      if (ext === '.html') {
        headers['Cache-Control'] = 'no-cache';
      } else {
        headers['Cache-Control'] = 'public, max-age=86400'; // 1 día para assets estáticos
      }

      res.writeHead(200, headers);
      if (req.method === 'HEAD') {
        res.end();
      } else {
        res.end(data);
      }
    });
  });
});

server.listen(PORT, HOST, () => {
  console.log(`====================================================`);
  console.log(`🚀 SENA 3D Hub Server listo en Railway / Producción`);
  console.log(`🌐 URL Local:  http://localhost:${PORT}`);
  console.log(`📡 Escuchando: http://${HOST}:${PORT}`);
  console.log(`📦 Directorio: ${BASE_DIR}`);
  console.log(`====================================================`);
});

// Manejo de apagado elegante (Graceful Shutdown)
process.on('SIGTERM', () => {
  console.log('Recibida señal SIGTERM. Cerrando servidor HTTP...');
  server.close(() => {
    console.log('Servidor finalizado exitosamente.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('Recibida señal SIGINT. Cerrando servidor HTTP...');
  server.close(() => {
    process.exit(0);
  });
});
