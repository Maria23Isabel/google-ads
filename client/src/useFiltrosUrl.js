import { useCallback, useEffect, useState } from 'react';

const lista = (v) => (v ? v.split(',').filter(Boolean) : []);

function leer() {
  const p = new URLSearchParams(window.location.search);
  const attrs = {};
  p.forEach((v, k) => {
    if (k.startsWith('a_')) attrs[k.slice(2)] = lista(v);
  });
  return {
    cat: p.get('cat') || '',
    sub: lista(p.get('sub')),
    marca: lista(p.get('marca')),
    attrs,
    q: p.get('q') || '',
    min: p.get('min') || '',
    max: p.get('max') || '',
    oferta: p.get('oferta') === '1',
    orden: p.get('orden') || 'precio-asc',
  };
}

export const SIN_FILTROS = { sub: [], marca: [], attrs: {}, q: '', min: '', max: '', oferta: false };

function escribir(f) {
  const p = new URLSearchParams(window.location.search);
  [...p.keys()].filter((k) => k.startsWith('a_')).forEach((k) => p.delete(k));
  const poner = (k, v) => (v ? p.set(k, v) : p.delete(k));
  poner('cat', f.cat);
  poner('sub', f.sub.join(','));
  poner('marca', f.marca.join(','));
  poner('q', f.q);
  poner('min', f.min);
  poner('max', f.max);
  poner('oferta', f.oferta ? '1' : '');
  poner('orden', f.orden === 'precio-asc' ? '' : f.orden);
  Object.entries(f.attrs).forEach(([id, v]) => v.length && p.set(`a_${id}`, v.join(',')));
  const qs = p.toString();
  window.history.pushState(null, '', qs ? `?${qs}` : window.location.pathname);
}

// El estado vive en la URL: cada combinación es un enlace compartible y usable como destino de un anuncio
// (p. ej. /?cat=skincare&sub=mascarillas&a_piel=Grasa). Los parámetros utm_* y gclid se conservan.
export function useFiltrosUrl() {
  const [filtros, setFiltros] = useState(leer);

  useEffect(() => {
    const alVolver = () => setFiltros(leer());
    window.addEventListener('popstate', alVolver);
    return () => window.removeEventListener('popstate', alVolver);
  }, []);

  const cambiar = useCallback((parcial) => {
    setFiltros((actual) => {
      const nuevo = { ...actual, ...parcial };
      escribir(nuevo);
      return nuevo;
    });
  }, []);

  return [filtros, cambiar];
}
