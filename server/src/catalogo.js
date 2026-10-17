// Categorías, público objetivo, filtros propios de cada categoría y catálogo.
// Los precios son DEMO: se generan con una semilla por producto y tienda.
// Para usar datos reales, reemplazar `obtenerProductos` en repositorio.js por una
// consulta a la base de precios (precios_retail / Precios Calientes).
//
// Los filtros de cada categoría salen de lo que usan los comparadores y marketplaces del Perú
// (Falabella, Ripley, Mercado Libre, Sephora, Inkafarma): siempre precio, marca y ofertas, más
// los atributos que de verdad deciden la compra en cada rubro (tipo de piel, almacenamiento, conexión…).

export const TIENDAS = [
  { id: 'falabella', nombre: 'Falabella', factor: 1.0 },
  { id: 'ripley', nombre: 'Ripley', factor: 0.97 },
  { id: 'mercadolibre', nombre: 'Mercado Libre', factor: 0.93 },
  { id: 'oechsle', nombre: 'Oechsle', factor: 1.04 },
  { id: 'sephora', nombre: 'Sephora', factor: 1.02, soloCategorias: ['skincare', 'maquillaje'] },
  { id: 'inkafarma', nombre: 'Inkafarma', factor: 0.95, soloCategorias: ['skincare', 'maquillaje'] },
  { id: 'coolbox', nombre: 'Coolbox', factor: 1.01, soloCategorias: ['celulares', 'audio', 'laptops'] },
  { id: 'hiraoka', nombre: 'Hiraoka', factor: 1.03, soloCategorias: ['hogar', 'laptops', 'audio'] },
];

export const CATEGORIAS = [
  {
    id: 'skincare',
    nombre: 'Skincare',
    icono: '🧴',
    publico: 'Mujeres de 20 a 30 años',
    lema: 'Cuida tu piel con el mejor precio',
    filtros: [
      { id: 'piel', nombre: 'Tipo de piel' },
      { id: 'necesidad', nombre: 'Necesidad' },
    ],
    subcategorias: [
      { id: 'mascarillas', nombre: 'Mascarillas', icono: '🫧' },
      { id: 'limpiadores', nombre: 'Limpiadores faciales', icono: '🧼' },
      { id: 'serums', nombre: 'Sérums', icono: '💧' },
      { id: 'hidratantes', nombre: 'Hidratantes', icono: '🌸' },
      { id: 'protector-solar', nombre: 'Protector solar', icono: '☀️' },
    ],
  },
  {
    id: 'maquillaje',
    nombre: 'Maquillaje',
    icono: '💄',
    publico: 'Mujeres de 18 a 35 años',
    lema: 'Tu maquillaje favorito, al menor precio',
    filtros: [{ id: 'acabado', nombre: 'Acabado' }],
    subcategorias: [
      { id: 'rostro', nombre: 'Rostro (bases y correctores)', icono: '🎨' },
      { id: 'labios', nombre: 'Labios', icono: '💋' },
      { id: 'ojos', nombre: 'Ojos y pestañas', icono: '👁️' },
    ],
  },
  {
    id: 'celulares',
    nombre: 'Celulares',
    icono: '📱',
    publico: 'Jóvenes de 16 a 20 años',
    lema: 'Tu próximo celular, al menor precio',
    filtros: [
      { id: 'sistema', nombre: 'Sistema operativo' },
      { id: 'almacenamiento', nombre: 'Almacenamiento' },
      { id: 'red', nombre: 'Red' },
    ],
    subcategorias: [
      { id: 'gama-economica', nombre: 'Gama económica', icono: '💸' },
      { id: 'gama-media', nombre: 'Gama media', icono: '⚡' },
      { id: 'gama-alta', nombre: 'Gama alta', icono: '🚀' },
      { id: 'accesorios', nombre: 'Fundas y cargadores', icono: '🔌' },
    ],
  },
  {
    id: 'audio',
    nombre: 'Audífonos y gaming',
    icono: '🎧',
    publico: 'Jóvenes de 16 a 25 años',
    lema: 'Sonido y juego sin pagar de más',
    filtros: [
      { id: 'conexion', nombre: 'Conexión' },
      { id: 'compatibilidad', nombre: 'Compatible con' },
    ],
    subcategorias: [
      { id: 'inalambricos', nombre: 'Audífonos inalámbricos', icono: '🎵' },
      { id: 'gamer', nombre: 'Headsets gamer', icono: '🎮' },
      { id: 'parlantes', nombre: 'Parlantes', icono: '🔊' },
    ],
  },
  {
    id: 'laptops',
    nombre: 'Laptops y tablets',
    icono: '💻',
    publico: 'Estudiantes y jóvenes de 17 a 30 años',
    lema: 'Estudia, trabaja y juega sin pagar de más',
    filtros: [
      { id: 'sistema', nombre: 'Sistema operativo' },
      { id: 'ram', nombre: 'Memoria RAM' },
    ],
    subcategorias: [
      { id: 'laptops', nombre: 'Laptops', icono: '💻' },
      { id: 'laptops-gamer', nombre: 'Laptops gamer', icono: '🕹️' },
      { id: 'tablets', nombre: 'Tablets', icono: '📲' },
    ],
  },
  {
    id: 'hogar',
    nombre: 'Hogar y electro',
    icono: '🏠',
    publico: 'Hogares de 25 a 45 años',
    lema: 'Equipa tu casa comparando precios',
    filtros: [{ id: 'caracteristica', nombre: 'Característica' }],
    subcategorias: [
      { id: 'cocina', nombre: 'Cocina', icono: '🍳' },
      { id: 'lavado', nombre: 'Lavado y limpieza', icono: '🧺' },
      { id: 'climatizacion', nombre: 'Climatización', icono: '❄️' },
    ],
  },
];

const T = 'Todo tipo';

// [categoria, subcategoria, marca, nombre, precio base en S/, atributos]
const BASE = [
  // Skincare
  ['skincare', 'mascarillas', 'Garnier', 'Mascarilla de tela Hidra Bomb Vitamina C', 9, { piel: [T], necesidad: ['Manchas'] }],
  ['skincare', 'mascarillas', 'Mediheal', 'Mascarilla N.M.F Aquaring (caja x10)', 69, { piel: ['Seca'], necesidad: ['Hidratación'] }],
  ['skincare', 'mascarillas', 'The Face Shop', 'Mascarilla Real Nature Aloe', 8, { piel: ['Sensible'], necesidad: ['Hidratación'] }],
  ['skincare', 'mascarillas', "L'Oréal", 'Mascarilla de arcilla Pure-Clay 50 ml', 42, { piel: ['Grasa'], necesidad: ['Acné'] }],
  ['skincare', 'mascarillas', 'Garnier', 'Mascarilla Carbón Pure Active', 8, { piel: ['Grasa'], necesidad: ['Acné'] }],
  ['skincare', 'mascarillas', 'Freeman', 'Mascarilla Peel-off Pepino', 14, { piel: ['Mixta'], necesidad: ['Limpieza'] }],
  ['skincare', 'limpiadores', 'CeraVe', 'Limpiador facial hidratante 473 ml', 79, { piel: ['Seca', 'Sensible'], necesidad: ['Limpieza'] }],
  ['skincare', 'limpiadores', 'La Roche-Posay', 'Gel limpiador Effaclar 400 ml', 95, { piel: ['Grasa'], necesidad: ['Acné'] }],
  ['skincare', 'limpiadores', 'Neutrogena', 'Gel limpiador Hydro Boost 200 ml', 39, { piel: [T], necesidad: ['Hidratación'] }],
  ['skincare', 'limpiadores', 'Cetaphil', 'Loción limpiadora piel sensible 237 ml', 55, { piel: ['Sensible'], necesidad: ['Limpieza'] }],
  ['skincare', 'limpiadores', 'Bioré', 'Espuma limpiadora Acne Care 150 ml', 29, { piel: ['Grasa', 'Mixta'], necesidad: ['Acné'] }],
  ['skincare', 'serums', 'The Ordinary', 'Niacinamida 10% + Zinc 1% 30 ml', 49, { piel: ['Grasa', 'Mixta'], necesidad: ['Manchas'] }],
  ['skincare', 'serums', 'Vichy', 'Mineral 89 Booster 50 ml', 149, { piel: [T], necesidad: ['Hidratación'] }],
  ['skincare', 'serums', "L'Oréal", 'Revitalift Ácido Hialurónico 30 ml', 89, { piel: [T], necesidad: ['Antiedad'] }],
  ['skincare', 'serums', 'Garnier', 'Sérum Vitamina C Brightening 30 ml', 59, { piel: [T], necesidad: ['Manchas'] }],
  ['skincare', 'serums', 'The Ordinary', 'Retinol 0.5% en escualano 30 ml', 55, { piel: ['Mixta', 'Seca'], necesidad: ['Antiedad'] }],
  ['skincare', 'hidratantes', 'CeraVe', 'Crema hidratante facial PM 52 ml', 69, { piel: [T], necesidad: ['Hidratación'] }],
  ['skincare', 'hidratantes', 'Neutrogena', 'Hydro Boost Water Gel 50 g', 52, { piel: ['Mixta', 'Grasa'], necesidad: ['Hidratación'] }],
  ['skincare', 'hidratantes', 'La Roche-Posay', 'Toleriane Double Repair 40 ml', 85, { piel: ['Sensible'], necesidad: ['Hidratación'] }],
  ['skincare', 'hidratantes', 'Nivea', 'Crema Soft 200 ml', 25, { piel: ['Seca'], necesidad: ['Hidratación'] }],
  ['skincare', 'protector-solar', 'La Roche-Posay', 'Anthelios UVMune 400 FPS 50+ 50 ml', 99, { piel: [T], necesidad: ['Protección solar'] }],
  ['skincare', 'protector-solar', 'Isdin', 'Fusion Water FPS 50 50 ml', 109, { piel: ['Mixta', 'Grasa'], necesidad: ['Protección solar'] }],
  ['skincare', 'protector-solar', 'Eucerin', 'Sun Oil Control FPS 50+ 50 ml', 89, { piel: ['Grasa'], necesidad: ['Protección solar'] }],
  ['skincare', 'protector-solar', 'Bioré', 'UV Aqua Rich Watery Essence FPS 50', 45, { piel: [T], necesidad: ['Protección solar'] }],

  // Maquillaje
  ['maquillaje', 'rostro', 'Maybelline', 'Base Fit Me Matte + Poreless', 59, { acabado: ['Mate'] }],
  ['maquillaje', 'rostro', 'Maybelline', 'Base Fit Me Dewy + Smooth', 59, { acabado: ['Brillante'] }],
  ['maquillaje', 'rostro', "L'Oréal", 'Base True Match', 79, { acabado: ['Natural'] }],
  ['maquillaje', 'rostro', 'NYX', 'Corrector Bare With Me', 45, { acabado: ['Natural'] }],
  ['maquillaje', 'labios', 'Maybelline', 'Labial líquido Superstay Matte Ink', 45, { acabado: ['Mate'] }],
  ['maquillaje', 'labios', 'NYX', 'Gloss Butter Gloss', 39, { acabado: ['Brillante'] }],
  ['maquillaje', 'labios', "L'Oréal", 'Labial Rouge Signature', 55, { acabado: ['Mate'] }],
  ['maquillaje', 'labios', 'Revlon', 'Labial Super Lustrous', 42, { acabado: ['Brillante'] }],
  ['maquillaje', 'ojos', 'Maybelline', 'Máscara de pestañas Lash Sensational', 49, {}],
  ['maquillaje', 'ojos', 'NYX', 'Delineador Epic Ink Liner', 39, {}],
  ['maquillaje', 'ojos', "L'Oréal", 'Máscara Paradise Extatic', 55, {}],

  // Celulares
  ['celulares', 'gama-economica', 'Xiaomi', 'Redmi 13C 128 GB', 449, { sistema: ['Android'], almacenamiento: ['128 GB'], red: ['4G'] }],
  ['celulares', 'gama-economica', 'Samsung', 'Galaxy A06 64 GB', 399, { sistema: ['Android'], almacenamiento: ['64 GB'], red: ['4G'] }],
  ['celulares', 'gama-economica', 'Motorola', 'Moto G15 128 GB', 479, { sistema: ['Android'], almacenamiento: ['128 GB'], red: ['4G'] }],
  ['celulares', 'gama-economica', 'Realme', 'C61 128 GB', 429, { sistema: ['Android'], almacenamiento: ['128 GB'], red: ['4G'] }],
  ['celulares', 'gama-media', 'Samsung', 'Galaxy A36 5G 256 GB', 1299, { sistema: ['Android'], almacenamiento: ['256 GB'], red: ['5G'] }],
  ['celulares', 'gama-media', 'Xiaomi', 'Redmi Note 14 Pro 256 GB', 1149, { sistema: ['Android'], almacenamiento: ['256 GB'], red: ['5G'] }],
  ['celulares', 'gama-media', 'Honor', 'Honor 200 Lite 256 GB', 999, { sistema: ['Android'], almacenamiento: ['256 GB'], red: ['5G'] }],
  ['celulares', 'gama-media', 'Motorola', 'Moto G85 256 GB', 1099, { sistema: ['Android'], almacenamiento: ['256 GB'], red: ['5G'] }],
  ['celulares', 'gama-media', 'Apple', 'iPhone 13 128 GB', 1999, { sistema: ['iOS'], almacenamiento: ['128 GB'], red: ['5G'] }],
  ['celulares', 'gama-alta', 'Apple', 'iPhone 16 128 GB', 3399, { sistema: ['iOS'], almacenamiento: ['128 GB'], red: ['5G'] }],
  ['celulares', 'gama-alta', 'Apple', 'iPhone 16 Pro 256 GB', 4799, { sistema: ['iOS'], almacenamiento: ['256 GB'], red: ['5G'] }],
  ['celulares', 'gama-alta', 'Samsung', 'Galaxy S25 256 GB', 3599, { sistema: ['Android'], almacenamiento: ['256 GB'], red: ['5G'] }],
  ['celulares', 'gama-alta', 'Samsung', 'Galaxy S25 Ultra 512 GB', 5399, { sistema: ['Android'], almacenamiento: ['512 GB'], red: ['5G'] }],
  ['celulares', 'gama-alta', 'Google', 'Pixel 9 128 GB', 3199, { sistema: ['Android'], almacenamiento: ['128 GB'], red: ['5G'] }],
  ['celulares', 'accesorios', 'Samsung', 'Cargador rápido 25 W USB-C', 79, {}],
  ['celulares', 'accesorios', 'Spigen', 'Funda Ultra Hybrid iPhone 16', 69, {}],
  ['celulares', 'accesorios', 'Anker', 'Power bank 10 000 mAh', 109, {}],
  ['celulares', 'accesorios', 'Apple', 'Cable USB-C a Lightning 1 m', 79, {}],

  // Audífonos y gaming
  ['audio', 'inalambricos', 'Apple', 'AirPods 4', 649, { conexion: ['Inalámbrico'], compatibilidad: ['Celular'] }],
  ['audio', 'inalambricos', 'Samsung', 'Galaxy Buds3', 549, { conexion: ['Inalámbrico'], compatibilidad: ['Celular'] }],
  ['audio', 'inalambricos', 'JBL', 'Wave Beam TWS', 229, { conexion: ['Inalámbrico'], compatibilidad: ['Celular', 'PC'] }],
  ['audio', 'inalambricos', 'Xiaomi', 'Redmi Buds 6 Play', 79, { conexion: ['Inalámbrico'], compatibilidad: ['Celular'] }],
  ['audio', 'inalambricos', 'Sony', 'WF-C510', 249, { conexion: ['Inalámbrico'], compatibilidad: ['Celular', 'PC'] }],
  ['audio', 'gamer', 'HyperX', 'Cloud Stinger 2', 229, { conexion: ['Con cable'], compatibilidad: ['PC', 'Consola'] }],
  ['audio', 'gamer', 'Logitech', 'G435 Lightspeed', 299, { conexion: ['Inalámbrico'], compatibilidad: ['PC', 'Consola', 'Celular'] }],
  ['audio', 'gamer', 'Razer', 'Kraken V4 X', 249, { conexion: ['Con cable'], compatibilidad: ['PC'] }],
  ['audio', 'gamer', 'Redragon', 'Zeus H510', 179, { conexion: ['Con cable'], compatibilidad: ['PC', 'Consola'] }],
  ['audio', 'parlantes', 'JBL', 'Flip 6', 479, { conexion: ['Inalámbrico'], compatibilidad: ['Celular', 'PC'] }],
  ['audio', 'parlantes', 'Sony', 'SRS-XB100', 249, { conexion: ['Inalámbrico'], compatibilidad: ['Celular', 'PC'] }],
  ['audio', 'parlantes', 'Anker', 'Soundcore 2', 119, { conexion: ['Inalámbrico'], compatibilidad: ['Celular', 'PC'] }],

  // Laptops y tablets
  ['laptops', 'laptops', 'Lenovo', 'IdeaPad 1 15" 8 GB / 256 GB', 1299, { sistema: ['Windows'], ram: ['8 GB'] }],
  ['laptops', 'laptops', 'HP', '15-fd 15.6" 16 GB / 512 GB', 1899, { sistema: ['Windows'], ram: ['16 GB'] }],
  ['laptops', 'laptops', 'ASUS', 'Vivobook 15 8 GB / 512 GB', 1499, { sistema: ['Windows'], ram: ['8 GB'] }],
  ['laptops', 'laptops', 'Apple', 'MacBook Air M2 13" 16 GB / 256 GB', 4299, { sistema: ['macOS'], ram: ['16 GB'] }],
  ['laptops', 'laptops-gamer', 'ASUS', 'TUF Gaming F15 RTX 4050', 3599, { sistema: ['Windows'], ram: ['16 GB'] }],
  ['laptops', 'laptops-gamer', 'Lenovo', 'LOQ 15 RTX 3050', 3399, { sistema: ['Windows'], ram: ['16 GB'] }],
  ['laptops', 'laptops-gamer', 'HP', 'Victus 16 RTX 4050', 3299, { sistema: ['Windows'], ram: ['16 GB'] }],
  ['laptops', 'laptops-gamer', 'MSI', 'Thin 15 RTX 4050', 3099, { sistema: ['Windows'], ram: ['16 GB'] }],
  ['laptops', 'tablets', 'Samsung', 'Galaxy Tab A9+ 128 GB', 799, { sistema: ['Android'], ram: ['8 GB'] }],
  ['laptops', 'tablets', 'Apple', 'iPad 10.ª gen 64 GB', 1699, { sistema: ['iPadOS'], ram: ['4 GB'] }],
  ['laptops', 'tablets', 'Xiaomi', 'Redmi Pad SE 128 GB', 599, { sistema: ['Android'], ram: ['4 GB'] }],
  ['laptops', 'tablets', 'Lenovo', 'Tab M11 128 GB', 749, { sistema: ['Android'], ram: ['4 GB'] }],

  // Hogar y electro
  ['hogar', 'cocina', 'Oster', 'Licuadora Reversible 600 W', 199, { caracteristica: ['Manual'] }],
  ['hogar', 'cocina', 'Philips', 'Airfryer XL 6.2 L', 549, { caracteristica: ['Digital'] }],
  ['hogar', 'cocina', 'Daewoo', 'Microondas 20 L', 249, { caracteristica: ['Digital'] }],
  ['hogar', 'cocina', 'Imaco', 'Olla arrocera 1.8 L', 99, { caracteristica: ['Manual'] }],
  ['hogar', 'lavado', 'LG', 'Lavadora 13 kg Smart Inverter', 1599, { caracteristica: ['Inverter', 'Smart'] }],
  ['hogar', 'lavado', 'Samsung', 'Lavadora 15 kg Inverter', 1999, { caracteristica: ['Inverter'] }],
  ['hogar', 'lavado', 'Daewoo', 'Lavadora 11 kg semiautomática', 699, { caracteristica: ['Manual'] }],
  ['hogar', 'lavado', 'Dyson', 'Aspiradora inalámbrica V8', 1799, { caracteristica: ['Inalámbrico'] }],
  ['hogar', 'lavado', 'Xiaomi', 'Robot aspirador E5', 649, { caracteristica: ['Smart'] }],
  ['hogar', 'climatizacion', 'Daewoo', 'Aire acondicionado split 12 000 BTU', 1399, { caracteristica: ['Inverter'] }],
  ['hogar', 'climatizacion', 'LG', 'Aire acondicionado Dual Inverter 12 000 BTU', 1999, { caracteristica: ['Inverter', 'Smart'] }],
  ['hogar', 'climatizacion', 'Samsung', 'Aire acondicionado WindFree 12 000 BTU', 1799, { caracteristica: ['Inverter'] }],
  ['hogar', 'climatizacion', 'Daewoo', 'Ventilador de torre 40"', 189, { caracteristica: ['Manual'] }],
];

// Pseudoaleatorio estable: el mismo producto siempre da el mismo precio.
function semilla(texto) {
  let h = 2166136261;
  for (const c of texto) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return ((h >>> 0) % 1000) / 1000;
}

const slug = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const PRODUCTOS = BASE.map(([categoria, subcategoria, marca, nombre, base, atributos]) => {
  const id = slug(`${marca}-${nombre}`);
  const ofertas = TIENDAS.filter((t) => !t.soloCategorias || t.soloCategorias.includes(categoria)).map((t) => {
    const ruido = 0.94 + semilla(id + t.id) * 0.14;
    const precio = Math.round(base * t.factor * ruido * 10) / 10;
    const conDescuento = semilla(t.id + id + 'd') > 0.55;
    const precioLista = conDescuento ? Math.round(precio * (1.1 + semilla(id) * 0.2)) : null;
    return {
      tienda: t.id,
      tiendaNombre: t.nombre,
      precio,
      precioLista,
      enStock: semilla(id + t.id + 's') > 0.08,
    };
  });
  return { id, categoria, subcategoria, marca, nombre, atributos, ofertas };
});

export const tiendasDe = (categoria) => TIENDAS.filter((t) => !t.soloCategorias || t.soloCategorias.includes(categoria));
