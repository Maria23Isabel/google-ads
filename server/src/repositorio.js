import { CATEGORIAS, PRODUCTOS, tiendasDe } from './catalogo.js';

export function obtenerCategorias() {
  return CATEGORIAS.map((c) => ({
    ...c,
    total: PRODUCTOS.filter((p) => p.categoria === c.id).length,
    subcategorias: c.subcategorias.map((s) => ({
      ...s,
      total: PRODUCTOS.filter((p) => p.categoria === c.id && p.subcategoria === s.id).length,
    })),
  }));
}

const mejorOferta = (p) => {
  const disponibles = p.ofertas.filter((o) => o.enStock);
  const lista = disponibles.length ? disponibles : p.ofertas;
  return lista.reduce((a, b) => (b.precio < a.precio ? b : a));
};

const cuenta = (valores) => {
  const m = new Map();
  valores.forEach((v) => m.set(v, (m.get(v) || 0) + 1));
  return [...m.entries()].sort((a, b) => String(a[0]).localeCompare(String(b[0]), 'es', { numeric: true }));
};

// Filtros: categoria (obligatoria), sub (lista), marca (lista), attrs ({idFiltro: [valores]}), q, min, max,
// oferta (solo con descuento) y orden. Sin ningún filtro marcado se devuelven todos los tipos de producto.
export function obtenerProductos({ categoria, sub, marca, attrs = {}, q, min, max, oferta, orden }) {
  const cat = CATEGORIAS.find((c) => c.id === categoria);
  if (!cat) return { total: 0, marcas: [], facetas: [], tiendas: [], productos: [] };

  const subs = sub ? sub.split(',') : [];
  const marcas = marca ? marca.split(',') : [];
  const texto = (q || '').trim().toLowerCase();

  const deLaCategoria = PRODUCTOS.filter((p) => p.categoria === categoria);
  // Las opciones de cada filtro se arman con el tipo de producto elegido, para no ofrecer combinaciones vacías.
  const base = deLaCategoria.filter((p) => !subs.length || subs.includes(p.subcategoria));

  const coincideAttrs = (p) =>
    Object.entries(attrs).every(([id, valores]) => {
      if (!valores.length) return true;
      const del = p.atributos[id] || [];
      return valores.some((v) => del.includes(v));
    });

  let lista = base
    .filter((p) => !marcas.length || marcas.includes(p.marca))
    .filter(coincideAttrs)
    .filter((p) => !texto || `${p.marca} ${p.nombre}`.toLowerCase().includes(texto))
    .map((p) => {
      const ofertas = [...p.ofertas].sort((a, b) => a.precio - b.precio);
      const mejor = mejorOferta(p);
      const maxPrecio = Math.max(...p.ofertas.map((o) => o.precio));
      return { ...p, ofertas, mejor, ahorro: Math.round((maxPrecio - mejor.precio) * 10) / 10 };
    })
    .filter((p) => (min == null || p.mejor.precio >= min) && (max == null || p.mejor.precio <= max))
    .filter((p) => !oferta || p.ofertas.some((o) => o.precioLista));

  const ordenes = {
    'precio-asc': (a, b) => a.mejor.precio - b.mejor.precio,
    'precio-desc': (a, b) => b.mejor.precio - a.mejor.precio,
    ahorro: (a, b) => b.ahorro - a.ahorro,
    nombre: (a, b) => a.nombre.localeCompare(b.nombre),
  };
  lista.sort(ordenes[orden] || ordenes['precio-asc']);

  const facetas = cat.filtros
    .map((f) => ({
      id: f.id,
      nombre: f.nombre,
      opciones: cuenta(base.flatMap((p) => p.atributos[f.id] || [])).map(([valor, total]) => ({ valor, total })),
    }))
    .filter((f) => f.opciones.length > 0);

  const precios = base.map((p) => mejorOferta(p).precio);
  return {
    total: lista.length,
    marcas: [...new Set(base.map((p) => p.marca))].sort(),
    facetas,
    rangoPrecio: precios.length ? { min: Math.floor(Math.min(...precios)), max: Math.ceil(Math.max(...precios)) } : null,
    tiendas: tiendasDe(categoria).map((t) => ({ id: t.id, nombre: t.nombre })),
    productos: lista,
  };
}
