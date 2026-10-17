# google_ads — Comparador de precios para campañas

Landing de comparación de precios por categoría, pensada como destino de anuncios de Google Ads.
El visitante entra directo, elige una categoría y ve los precios por tienda; a un costado filtra por
tipo de producto (mascarillas, limpiadores…) y marca.

**Stack**: React 18 + Vite (`client/`), Node + Express (`server/`), workspaces de npm.

## Correr

```bash
npm install
npm run dev        # front http://localhost:4400, API http://localhost:4401
npm run build && npm start   # producción: Express sirve client/dist en :4401
```

## Categorías, público y filtros

Cada categoría tiene sus propios filtros (se definen en `server/src/catalogo.js`). Todas comparten precio
(mín/máx), "solo con descuento", tipo de producto y marca. Sin nada marcado se muestran todos los tipos.

| Categoría | Público | Tipos de producto | Filtros propios |
|---|---|---|---|
| Skincare | Mujeres 20–30 | Mascarillas, limpiadores, sérums, hidratantes, protector solar | Tipo de piel, necesidad |
| Maquillaje | Mujeres 18–35 | Rostro, labios, ojos | Acabado |
| Celulares | Jóvenes 16–20 | Gama económica / media / alta, accesorios | Sistema operativo, almacenamiento, red |
| Audífonos y gaming | Jóvenes 16–25 | Inalámbricos, headsets gamer, parlantes | Conexión, compatible con |
| Laptops y tablets | Estudiantes 17–30 | Laptops, laptops gamer, tablets | Sistema operativo, RAM |
| Hogar y electro | Hogares 25–45 | Cocina, lavado, climatización | Característica (Inverter, Smart…) |

La tabla tiene un producto por fila (agrupados por tipo) y una tienda por columna; el menor precio de cada fila va resaltado.

## Enlaces para anuncios

El estado vive en la URL, así que cada anuncio puede aterrizar ya filtrado:

```
/?cat=skincare&sub=mascarillas&utm_source=google&utm_campaign=skincare-mascarillas&gclid=...
/?cat=celulares&sub=gama-media
```

Los `utm_*` y `gclid` se guardan y viajan en cada clic de salida a tienda (`POST /api/clics`, hoy se
imprime en el log del servidor; ahí se conecta la medición de conversiones).

## API

- `GET /api/categorias`
- `GET /api/productos?categoria=skincare&sub=mascarillas,serums&marca=CeraVe&a_piel=Grasa,Mixta&min=20&max=80&oferta=1&q=&orden=precio-asc|precio-desc|ahorro|nombre`
- `POST /api/clics` `{ productoId, tienda, utm }`

## Pendiente

- **Los precios son DEMO** (generados en `catalogo.js`). Para datos reales, reemplazar la lectura en
  `server/src/repositorio.js` por una consulta a la base de precios (`precios_retail` / Precios Calientes).
- El botón "Ir a la tienda" abre una búsqueda de Google; poner la URL real del producto y, si se usan
  enlaces de afiliado, agregarlos ahí.
- Imágenes de producto, tracking (GA4 / etiqueta de conversión de Google Ads), SEO por categoría (SSR o prerender).
