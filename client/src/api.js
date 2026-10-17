// Con VITE_STATIC=1 (GitHub Pages, sin servidor) el catálogo y los filtros corren en el navegador,
// con el mismo código que usa la API de Node.
const ESTATICO = import.meta.env.VITE_STATIC === '1';
const repositorio = () => import('../../server/src/repositorio.js');

export async function getCategorias() {
  if (ESTATICO) return (await repositorio()).obtenerCategorias();
  const r = await fetch('/api/categorias');
  if (!r.ok) throw new Error('No se pudieron cargar las categorías');
  return r.json();
}

export async function getProductos(f, signal) {
  if (ESTATICO) {
    return (await repositorio()).obtenerProductos({
      categoria: f.cat,
      sub: f.sub.join(','),
      marca: f.marca.join(','),
      attrs: f.attrs,
      q: f.q,
      min: f.min === '' ? undefined : Number(f.min),
      max: f.max === '' ? undefined : Number(f.max),
      oferta: f.oferta,
      orden: f.orden,
    });
  }
  const qs = new URLSearchParams({ categoria: f.cat });
  if (f.sub.length) qs.set('sub', f.sub.join(','));
  if (f.marca.length) qs.set('marca', f.marca.join(','));
  if (f.q) qs.set('q', f.q);
  if (f.min) qs.set('min', f.min);
  if (f.max) qs.set('max', f.max);
  if (f.oferta) qs.set('oferta', '1');
  qs.set('orden', f.orden);
  Object.entries(f.attrs).forEach(([id, valores]) => valores.length && qs.set(`a_${id}`, valores.join(',')));

  const r = await fetch(`/api/productos?${qs}`, { signal });
  if (!r.ok) throw new Error('No se pudieron cargar los productos');
  return r.json();
}

// Conserva los parámetros UTM / gclid con los que llegó el visitante desde Google Ads.
export function capturaUtm() {
  const p = new URLSearchParams(window.location.search);
  const utm = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'].forEach((k) => {
    if (p.get(k)) utm[k] = p.get(k);
  });
  return utm;
}

export function registraClic(productoId, tienda, utm) {
  if (ESTATICO) return; // sin servidor no hay dónde registrarlo
  const cuerpo = new Blob([JSON.stringify({ productoId, tienda, utm })], { type: 'application/json' });
  navigator.sendBeacon?.('/api/clics', cuerpo);
}
