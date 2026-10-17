import { useEffect, useMemo, useRef, useState } from 'react';
import { getCategorias, getProductos, capturaUtm } from './api.js';
import { useFiltrosUrl, SIN_FILTROS } from './useFiltrosUrl.js';
import CategoriaPicker from './components/CategoriaPicker.jsx';
import Filtros from './components/Filtros.jsx';
import TablaPrecios from './components/TablaPrecios.jsx';

const VACIO = { total: 0, marcas: [], facetas: [], tiendas: [], rangoPrecio: null, productos: [] };

export default function App() {
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState('');
  const [filtros, cambiar] = useFiltrosUrl();
  const [resultado, setResultado] = useState(VACIO);
  const [cargando, setCargando] = useState(false);
  const utm = useMemo(capturaUtm, []);
  const resultadosRef = useRef(null);

  useEffect(() => {
    getCategorias().then(setCategorias).catch((e) => setError(e.message));
  }, []);

  const categoria = categorias.find((c) => c.id === filtros.cat);

  useEffect(() => {
    if (!filtros.cat) return;
    // Cancela el pedido anterior: una respuesta lenta no debe pisar la vigente.
    const ctl = new AbortController();
    setCargando(true);
    getProductos(filtros, ctl.signal)
      .then((r) => {
        setResultado(r);
        setError('');
        setCargando(false);
      })
      .catch((e) => {
        if (e.name !== 'AbortError') {
          setError(e.message);
          setCargando(false);
        }
      });
    return () => ctl.abort();
  }, [filtros]);

  // Al cambiar de categoría los filtros se reinician: cada categoría tiene los suyos.
  const elegirCategoria = (id) => {
    cambiar({ ...SIN_FILTROS, cat: id, orden: 'precio-asc' });
    setTimeout(() => resultadosRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  return (
    <>
      <header className="top">
        <button className="logo" onClick={() => cambiar({ ...SIN_FILTROS, cat: '' })}>
          Compara<span>Precios</span>
        </button>
        <nav className="menu" aria-label="Categorías">
          {categorias.map((c) => (
            <button
              key={c.id}
              className={filtros.cat === c.id ? 'activa' : ''}
              aria-current={filtros.cat === c.id ? 'page' : undefined}
              onClick={() => elegirCategoria(c.id)}
            >
              <span aria-hidden="true">{c.icono}</span> {c.nombre}
            </button>
          ))}
        </nav>
      </header>

      <main>
        {!categoria ? (
          <section className="hero">
            <h1>¿Qué quieres comprar hoy?</h1>
            <p>Elige una categoría y mira el precio más bajo en todas las tiendas.</p>
            <CategoriaPicker categorias={categorias} onElegir={elegirCategoria} />
          </section>
        ) : (
          <section className="hero compacto">
            <h1>{categoria.lema}</h1>
            <p>{categoria.publico}</p>
          </section>
        )}

        {error && <p className="error" role="alert">{error}</p>}

        {categoria && (
          <section className="resultados" ref={resultadosRef}>
            <Filtros categoria={categoria} filtros={filtros} resultado={resultado} onCambio={cambiar} />
            <div className="lista">
              <div className="lista-cabecera">
                <strong>{cargando ? 'Buscando…' : `${resultado.total} productos`}</strong>
                <label>
                  Ordenar
                  <select value={filtros.orden} onChange={(e) => cambiar({ orden: e.target.value })}>
                    <option value="precio-asc">Menor precio</option>
                    <option value="precio-desc">Mayor precio</option>
                    <option value="ahorro">Mayor ahorro entre tiendas</option>
                    <option value="nombre">Nombre</option>
                  </select>
                </label>
              </div>
              {!cargando && resultado.total === 0 ? (
                <p className="vacio">No encontramos productos con esos filtros.</p>
              ) : (
                <TablaPrecios categoria={categoria} resultado={resultado} utm={utm} />
              )}
            </div>
          </section>
        )}
      </main>

      <footer>Los precios pueden cambiar sin previo aviso. Verifica el precio final en la tienda.</footer>
    </>
  );
}
