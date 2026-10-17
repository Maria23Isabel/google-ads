import { SIN_FILTROS } from '../useFiltrosUrl.js';

const alternar = (lista, valor) => (lista.includes(valor) ? lista.filter((x) => x !== valor) : [...lista, valor]);

function Grupo({ titulo, children }) {
  return (
    <fieldset>
      <legend>{titulo}</legend>
      {children}
    </fieldset>
  );
}

// Sin nada marcado se muestran todos los tipos de producto; al marcar, se filtra.
// Los filtros (tipo de piel, almacenamiento, conexión…) cambian según la categoría.
export default function Filtros({ categoria, filtros, resultado, onCambio }) {
  const { marcas, facetas, rangoPrecio } = resultado;
  const hayFiltros =
    filtros.sub.length || filtros.marca.length || filtros.q || filtros.min || filtros.max || filtros.oferta ||
    Object.values(filtros.attrs).some((v) => v.length);

  return (
    <aside className="filtros">
      <h2>Filtrar</h2>

      <input
        type="search"
        placeholder={`Buscar en ${categoria.nombre}`}
        value={filtros.q}
        onChange={(e) => onCambio({ q: e.target.value })}
      />

      <Grupo titulo="Precio (S/)">
        <div className="rango">
          <input
            type="number"
            min="0"
            inputMode="numeric"
            placeholder={rangoPrecio ? `Mín. ${rangoPrecio.min}` : 'Mín.'}
            value={filtros.min}
            onChange={(e) => onCambio({ min: e.target.value })}
          />
          <span>–</span>
          <input
            type="number"
            min="0"
            inputMode="numeric"
            placeholder={rangoPrecio ? `Máx. ${rangoPrecio.max}` : 'Máx.'}
            value={filtros.max}
            onChange={(e) => onCambio({ max: e.target.value })}
          />
        </div>
        <label className="check">
          <input type="checkbox" checked={filtros.oferta} onChange={(e) => onCambio({ oferta: e.target.checked })} />
          <span>Solo con descuento</span>
        </label>
      </Grupo>

      <Grupo titulo="Tipo de producto">
        {categoria.subcategorias.map((s) => (
          <label key={s.id} className="check">
            <input
              type="checkbox"
              checked={filtros.sub.includes(s.id)}
              onChange={() => onCambio({ sub: alternar(filtros.sub, s.id) })}
            />
            <span>
              {s.icono} {s.nombre}
            </span>
            <small>{s.total}</small>
          </label>
        ))}
      </Grupo>

      <Grupo titulo="Marca">
        {marcas.map((m) => (
          <label key={m} className="check">
            <input
              type="checkbox"
              checked={filtros.marca.includes(m)}
              onChange={() => onCambio({ marca: alternar(filtros.marca, m) })}
            />
            <span>{m}</span>
          </label>
        ))}
      </Grupo>

      {facetas.map((f) => (
        <Grupo key={f.id} titulo={f.nombre}>
          {f.opciones.map((o) => {
            const marcados = filtros.attrs[f.id] || [];
            return (
              <label key={o.valor} className="check">
                <input
                  type="checkbox"
                  checked={marcados.includes(o.valor)}
                  onChange={() => onCambio({ attrs: { ...filtros.attrs, [f.id]: alternar(marcados, o.valor) } })}
                />
                <span>{o.valor}</span>
                <small>{o.total}</small>
              </label>
            );
          })}
        </Grupo>
      ))}

      {hayFiltros && (
        <button className="limpiar" onClick={() => onCambio({ ...SIN_FILTROS })}>
          Limpiar filtros
        </button>
      )}
    </aside>
  );
}
