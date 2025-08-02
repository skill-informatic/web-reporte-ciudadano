import { TypesCategory, TypesData } from "../models/globalInfo.types";

export const getYourApproximateLocation = (): Promise<[number, number]> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocalización no soportada"));
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        resolve([latitude, longitude]);
      },
      (error) => {
        reject(error);
      }
    );
  });
};
export const optionTypeColorReport: { [key: string]: string } = {
  aguas_negras: "#333333",
  baches: "#6D4C41",
  fuga_agua: "#2196F3",
  poste_caido: "#FF9800",
  alumbrado_publico: "#FFEB3B",
  basura_acumulada: "#4CAF50",
  drenaje_tapado: "#673AB7",
  fauna_nociva: "#F44336",
  arbol_riesgo: "#2E7D32",
  semaforo_descompuesto: "#D32F2F",
};
export const optionTypeTextReport: { [key: string]: string } = {
  aguas_negras: "Aguas Negras",
  baches: "Baches",
  fuga_agua: "Fuga de Agua",
  poste_caido: "Poste Caído",
  alumbrado_publico: "Alumbrado Público",
  basura_acumulada: "Basura Acumulada",
  drenaje_tapado: "Drenaje Tapado",
  fauna_nociva: "Fauna Nociva",
  arbol_riesgo: "Árbol en Riesgo",
  semaforo_descompuesto: "Semáforo Descompuesto",
};

export const optionTypeColorNews: { [key: string]: string } = {
  politica: "#e74c3c",
  economia: "#f39c12",
  internacionales: "#2980b9",
  ciencia: "#8e44ad",
  tecnologia: "#27ae60",
  deportes: "#16a085",
  cultura: "#c0392b",
  entretenimiento: "#d35400",
  clima: "#3498db",
  sucesos: "#e74c3c",
  educacion: "#2ecc71",
  salud: "#1abc9c",
  automovilismo: "#34495e",
  medio_ambiente: "#2ecc71",
  negocios: "#9b59b6",
  turismo: "#f1c40f",
  tendencias: "#e67e22",
  historia: "#7f8c8d",
  opinion: "#95a5a6",
  locales: "#1abc9c",
};
export const optionTypeTextNews: { [key: string]: string } = {
  politica: "Política",
  economia: "Economía",
  internacionales: "Internacionales",
  ciencia: "Ciencia",
  tecnologia: "Tecnología",
  deportes: "Deportes",
  cultura: "Cultura",
  entretenimiento: "Entretenimiento",
  clima: "Clima",
  sucesos: "Sucesos",
  educacion: "Educación",
  salud: "Salud",
  automovilismo: "Automovilismo",
  medio_ambiente: "Medio Ambiente",
  negocios: "Negocios",
  turismo: "Turismo",
  tendencias: "Tendencias",
  historia: "Historia",
  opinion: "Opinión",
  locales: "Locales",
  crime: "Crimen",
};
export const optionsNews: TypesCategory[] = [
  { value: "politica", label: "Política" },
  { value: "economia", label: "Economía" },
  { value: "internacionales", label: "Internacionales" },
  { value: "ciencia", label: "Ciencia" },
  { value: "tecnologia", label: "Tecnología" },
  { value: "deportes", label: "Deportes" },
  { value: "cultura", label: "Cultura" },
  { value: "entretenimiento", label: "Entretenimiento" },
  { value: "clima", label: "Clima" },
  { value: "sucesos", label: "Sucesos" },
  { value: "educacion", label: "Educación" },
  { value: "salud", label: "Salud" },
  { value: "automovilismo", label: "Automovilismo" },
  { value: "medio_ambiente", label: "Medio Ambiente" },
  { value: "negocios", label: "Negocios" },
  { value: "turismo", label: "Turismo" },
  { value: "tendencias", label: "Tendencias" },
  { value: "historia", label: "Historia" },
  { value: "opinion", label: "Opinión" },
  { value: "locales", label: "Locales" },
  { value: "crimen", label: "Crimen" },
];
export const optionsReports: TypesCategory[] = [
  { value: "aguas_negras", label: "Aguas negras" },
  { value: "baches", label: "Baches" },
  { value: "fuga_agua", label: "Fuga de agua" },
  { value: "poste_caido", label: "Poste caído" },
  { value: "alumbrado_publico", label: "Alumbrado público" },
  { value: "basura_acumulada", label: "Basura acumulada" },
  { value: "drenaje_tapado", label: "Drenaje tapado" },
  { value: "fauna_nociva", label: "Fauna nociva" },
  { value: "arbol_riesgo", label: "Árbol caído o en riesgo" },
  { value: "semaforo_descompuesto", label: "Semáforo descompuesto" },
];

export const optionsPlaces: TypesCategory[] = [
  { value: "playas", label: "Playas" },
  { value: "miradores", label: "Miradores" },
  { value: "monumentos_historicos", label: "Monumentos históricos" },
  { value: "museos", label: "Museos" },
  { value: "zonas_arqueologicas", label: "Zonas arqueológicas" },
  { value: "iglesias", label: "Iglesias emblemáticas" },
  { value: "parques_reservas", label: "Parques y reservas naturales" },
  { value: "centros_comerciales", label: "Centros comerciales" },
  { value: "vida_nocturna", label: "Vida nocturna" },
  { value: "restaurantes", label: "Restaurantes típicos" },
  { value: "mercados_artesanias", label: "Mercados y artesanías" },
  { value: "espectaculos", label: "Espectáculos y shows" },
  { value: "actividades_acuaticas", label: "Actividades acuáticas" },
  { value: "islas_turisticas", label: "Islas turísticas" },
  { value: "festivales_eventos", label: "Festivales y eventos" },
];
export const optionTypeColorPlaces: { [key: string]: string } = {
  playas: "#3498db",
  miradores: "#2ecc71",
  monumentos_historicos: "#9b59b6",
  museos: "#34495e",
  zonas_arqueologicas: "#d35400",
  iglesias: "#e67e22",
  parques_reservas: "#27ae60",
  centros_comerciales: "#f1c40f",
  vida_nocturna: "#8e44ad",
  restaurantes: "#c0392b",
  mercados_artesanias: "#e74c3c",
  espectaculos: "#f39c12",
  actividades_acuaticas: "#1abc9c",
  islas_turisticas: "#16a085",
  festivales_eventos: "#e84393",
};
export const optionTypeTextPlaces: { [key: string]: string } = {
  playas: "Playas",
  miradores: "Miradores",
  monumentos_historicos: "Monumentos Históricos",
  museos: "Museos",
  zonas_arqueologicas: "Zonas Arqueológicas",
  iglesias: "Iglesias Emblemáticas",
  parques_reservas: "Parques y Reservas Naturales",
  centros_comerciales: "Centros Comerciales",
  vida_nocturna: "Vida Nocturna",
  restaurantes: "Restaurantes Típicos",
  mercados_artesanias: "Mercados y Artesanías",
  espectaculos: "Espectáculos y Shows",
  actividades_acuaticas: "Actividades Acuáticas",
  islas_turisticas: "Islas Turísticas",
  festivales_eventos: "Festivales y Eventos",
};
export const filterDataSelected = (
  datas: TypesData[],
  filterSelected: string
) => {
  return datas.filter((data: TypesData) => {
    if (filterSelected === "") return data;
    return data.category === filterSelected;
  });
};
