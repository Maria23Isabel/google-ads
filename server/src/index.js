import express from 'express';
import cors from 'cors';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { obtenerCategorias, obtenerProductos } from './repositorio.js';

const app = express();
const PORT = process.env.PORT || 4401;
const aqui = path.dirname(fileURLToPath(import.meta.url));

app.use(cors({ origin: process.env.CORS_ORIGIN || true }));
app.use(express.json());

const numero = (v) => (v === undefined || v === '' || Number.isNaN(Number(v)) ? undefined : Number(v));

app.get('/api/categorias', (_req, res) => res.json(obtenerCategorias()));

app.get('/api/productos', (req, res) => {
  const { categoria } = req.query;
  if (!categoria) return res.status(400).json({ mensaje: 'Falta la categoría' });
  // Los filtros propios de cada categoría llegan como a_<id>=valor1,valor2 (p. ej. a_piel=Grasa,Mixta).
  const attrs = {};
  Object.entries(req.query).forEach(([k, v]) => {
    if (k.startsWith('a_') && typeof v === 'string') attrs[k.slice(2)] = v.split(',').filter(Boolean);
  });
  res.json(
    obtenerProductos({
      categoria,
      sub: req.query.sub,
      marca: req.query.marca,
      attrs,
      q: req.query.q,
      min: numero(req.query.min),
      max: numero(req.query.max),
      oferta: req.query.oferta === '1',
      orden: req.query.orden,
    }),
  );
});

// Clic de salida a la tienda: aquí se mide la conversión de las campañas de Google Ads.
app.post('/api/clics', (req, res) => {
  const { productoId, tienda, utm } = req.body || {};
  console.log(JSON.stringify({ evento: 'clic_tienda', productoId, tienda, utm, fecha: new Date().toISOString() }));
  res.status(204).end();
});

// En producción sirve el front compilado.
const dist = path.resolve(aqui, '../../client/dist');
if (fs.existsSync(dist)) {
  app.use(express.static(dist));
  app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')));
}

app.listen(PORT, () => console.log(`API de comparación en http://localhost:${PORT}`));
