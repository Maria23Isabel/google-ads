export default function CategoriaPicker({ categorias, onElegir }) {
  return (
    <div className="categorias">
      {categorias.map((c) => (
        <button key={c.id} className="cat-card" onClick={() => onElegir(c.id)}>
          <span className="cat-icono">{c.icono}</span>
          <span className="cat-nombre">{c.nombre}</span>
          <span className="cat-publico">{c.publico}</span>
        </button>
      ))}
    </div>
  );
}
