import { registraClic } from '../api.js';

const soles = (n) => `S/ ${n.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// Filas = productos (agrupados por tipo), columnas = tiendas. El precio más bajo de cada fila va resaltado.
export default function TablaPrecios({ categoria, resultado, utm }) {
  const { productos, tiendas } = resultado;

  const grupos = categoria.subcategorias
    .map((s) => ({ ...s, productos: productos.filter((p) => p.subcategoria === s.id) }))
    .filter((g) => g.productos.length);

  const irATienda = (p, o) => {
    registraClic(p.id, o.tienda, utm);
    // TODO: reemplazar por la URL real del producto en la tienda cuando haya datos reales.
    const busqueda = encodeURIComponent(`${p.marca} ${p.nombre} ${o.tiendaNombre}`);
    window.open(`https://www.google.com/search?q=${busqueda}`, '_blank', 'noopener');
  };

  return (
    <div className="tabla-wrap">
      <table className="tabla">
        <thead>
          <tr>
            <th scope="col">Producto</th>
            {tiendas.map((t) => (
              <th key={t.id} scope="col" className="num">
                {t.nombre}
              </th>
            ))}
          </tr>
        </thead>
        {grupos.map((g) => (
          <tbody key={g.id}>
            <tr className="grupo">
              <th colSpan={tiendas.length + 1} scope="colgroup">
                {g.icono} {g.nombre} <small>{g.productos.length}</small>
              </th>
            </tr>
            {g.productos.map((p) => {
              const porTienda = Object.fromEntries(p.ofertas.map((o) => [o.tienda, o]));
              return (
                <tr key={p.id}>
                  <th scope="row" className="prod">
                    <span className="marca">{p.marca}</span>
                    <span className="nombre">{p.nombre}</span>
                    {p.ahorro > 0 && <span className="ahorro">Ahorras hasta {soles(p.ahorro)}</span>}
                  </th>
                  {tiendas.map((t) => {
                    const o = porTienda[t.id];
                    if (!o) return <td key={t.id} className="num vacia">—</td>;
                    if (!o.enStock) return <td key={t.id} className="num agotado">Agotado</td>;
                    const esMejor = o.tienda === p.mejor.tienda;
                    return (
                      <td key={t.id} className={`num ${esMejor ? 'mejor' : ''}`}>
                        <button onClick={() => irATienda(p, o)} title={`Ver en ${o.tiendaNombre}`}>
                          <strong>{soles(o.precio)}</strong>
                          {o.precioLista && <s>{soles(o.precioLista)}</s>}
                          {esMejor && <em>Mejor precio</em>}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        ))}
      </table>
    </div>
  );
}
