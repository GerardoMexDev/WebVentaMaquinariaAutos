export type CategoryId = "vial" | "agro" | "autos";

export interface Product {
  id: string;
  cat: CategoryId;
  name: string;
  brand: string;
  type: string;
  condition: "Nuevo" | "Usado";
  usage: string;
  year: number;
  price: number;
  image: string;
  flip?: boolean;
  badge?: string;
  specs: string[];
  ficha: { k: string; v: string }[];
}

export interface CategoryMeta {
  id: CategoryId;
  num: string;
  name: string;
  short: string;
  route: string;
  tagline: string;
  desc: string;
  color: string;
  colorDeep: string;
  image: string;
}

const IMG = {
  hero: "https://image.qwenlm.ai/generated-images/8639c296-c015-4e7e-ac89-a30141defbae/_result.png",
  excavator: "https://image.qwenlm.ai/generated-images/97be60cb-0f39-4bbe-bfb9-e18984e39f2c/_result.png",
  loader: "https://image.qwenlm.ai/generated-images/6fd19a51-b2c3-427f-a507-6f69a047707b/_result.png",
  roller: "https://image.qwenlm.ai/generated-images/1b54007f-fb91-4d59-8b72-b582fa71004e/_result.png",
  yard: "https://image.qwenlm.ai/generated-images/4809f667-1283-4e06-8de1-1fab3087579c/_result.png",
  tractor: "https://image.qwenlm.ai/generated-images/719af1f1-0abc-4f27-ba76-9f50a111000c/_result.png",
  harvester: "https://image.qwenlm.ai/generated-images/ee6f8f61-07a6-4226-968d-b8b3d8e1066a/_result.png",
  pickup: "https://image.qwenlm.ai/generated-images/bcebd2f4-5268-4b29-b666-7ae7d6e6a9e3/_result.png",
  suv: "https://image.qwenlm.ai/generated-images/38510c1f-1c1c-4513-ac99-55b33c944e4c/_result.png",
};

export const COMPANY = {
  name: "Terramak",
  legal: "Terramak S.A.C.",
  ruc: "20604815227",
  founded: 2007,
  phone: "+51 987 654 321",
  whatsapp: "51987654321",
  email: "ventas@terramak.pe",
  address: "Av. Circunvalación 1850, San Luis — Lima, Perú",
  hours: "Lun – Sáb · 8:00 a 18:00 h",
  yardImage: IMG.yard,
  heroImage: IMG.hero,
};

export const CATEGORIES: CategoryMeta[] = [
  {
    id: "vial",
    num: "01",
    name: "Maquinaria Vial",
    short: "Vial",
    route: "/vial",
    tagline: "Movimiento de tierras, carga y compactación",
    desc: "Excavadoras, cargadores frontales y rodillos usados certificados con stock real en Lima. Cada equipo pasa una inspección PDI de 200 puntos, sale con garantía Terramak Certified y soporte técnico en campo.",
    color: "#f5a623",
    colorDeep: "#d18a0b",
    image: IMG.loader,
  },
  {
    id: "agro",
    num: "02",
    name: "Maquinaria Agrícola",
    short: "Agrícola",
    route: "/agro",
    tagline: "Tractores y cosechadoras para el campo",
    desc: "Tractores de 75 a 165 HP y cosechadoras de alto rendimiento, usadas certificadas y con horas comprobadas. Financiamiento agrícola con cronograma de cuotas alineado a tu cosecha.",
    color: "#7c9a45",
    colorDeep: "#55702a",
    image: IMG.tractor,
  },
  {
    id: "autos",
    num: "03",
    name: "Autos y Camionetas",
    short: "Autos",
    route: "/autos",
    tagline: "Pickups, SUV y flotas para trabajo",
    desc: "Pickups 4x4 y SUV usadas certificadas con kilometraje verificado, más algunas unidades 0 km seleccionadas. Entrega inmediata, bono de flotero y transferencia en el día.",
    color: "#4e7fa0",
    colorDeep: "#33617f",
    image: IMG.pickup,
  },
];

export const catById = (id: CategoryId): CategoryMeta =>
  CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0];

export const PRODUCTS: Product[] = [
  /* ----------------------------- MAQUINARIA VIAL ----------------------------- */
  {
    id: "v-320gc",
    cat: "vial",
    name: "Excavadora Hidráulica 320 GC",
    brand: "Caterpillar",
    type: "Excavadora",
    condition: "Usado",
    usage: "950 h · 2022",
    year: 2022,
    price: 142500,
    image: IMG.excavator,
    badge: "Más vendida",
    specs: ["20.5 t", "145 HP", "Balde 1.2 m³", "950 h"],
    ficha: [
      { k: "Motor", v: "Cat C4.4 turbodiésel, Tier 3" },
      { k: "Profundidad de excavación", v: "6.72 m" },
      { k: "Historial", v: "950 h certificadas, único dueño" },
      { k: "Garantía", v: "12 meses Terramak Certified" },
    ],
  },
  {
    id: "v-sy215",
    cat: "vial",
    name: "Excavadora SY215C",
    brand: "SANY",
    type: "Excavadora",
    condition: "Usado",
    usage: "620 h · 2023",
    year: 2023,
    price: 98700,
    image: IMG.excavator,
    flip: true,
    badge: "Bajas horas",
    specs: ["21.5 t", "158 HP", "Balde 1.0 m³", "620 h"],
    ficha: [
      { k: "Motor", v: "Mitsubishi 4M50, 4 cilindros" },
      { k: "Alcance máximo", v: "9.95 m" },
      { k: "Historial", v: "620 h certificadas, obra única" },
      { k: "Garantía", v: "12 meses Terramak Certified" },
    ],
  },
  {
    id: "v-950gc",
    cat: "vial",
    name: "Cargador Frontal 950 GC",
    brand: "Caterpillar",
    type: "Cargador frontal",
    condition: "Usado",
    usage: "1,240 h · 2022",
    year: 2022,
    price: 156000,
    image: IMG.loader,
    badge: "Único dueño",
    specs: ["18.4 t", "222 HP", "Balde 3.1 m³", "1,240 h"],
    ficha: [
      { k: "Motor", v: "Cat C7.1 ACERT" },
      { k: "Carga de vuelco", v: "9.8 t" },
      { k: "Historial", v: "Mantenimiento en concesionario, bitácora completa" },
      { k: "Garantía", v: "6 meses Terramak Certified" },
    ],
  },
  {
    id: "v-wa320",
    cat: "vial",
    name: "Cargador Frontal WA320-8",
    brand: "Komatsu",
    type: "Cargador frontal",
    condition: "Usado",
    usage: "1,850 h · 2021",
    year: 2021,
    price: 148000,
    image: IMG.loader,
    flip: true,
    badge: "Revisado 200 pts",
    specs: ["15.2 t", "167 HP", "Balde 2.7 m³", "1,850 h"],
    ficha: [
      { k: "Motor", v: "Komatsu SAA6D107E-3" },
      { k: "Transmisión", v: "Powershift, 4 velocidades" },
      { k: "Historial", v: "Un solo dueño, mantenimiento en concesionario" },
      { k: "Garantía", v: "6 meses Terramak Certified" },
    ],
  },
  {
    id: "v-cs56b",
    cat: "vial",
    name: "Rodillo Compactador CS56B",
    brand: "Caterpillar",
    type: "Rodillo",
    condition: "Usado",
    usage: "780 h · 2023",
    year: 2023,
    price: 76900,
    image: IMG.roller,
    badge: "Bajas horas",
    specs: ["11.0 t", "130 HP", "Pata de cabra", "780 h"],
    ficha: [
      { k: "Motor", v: "Cat C4.4" },
      { k: "Ancho de tambor", v: "2.13 m" },
      { k: "Historial", v: "Obra única, horas certificadas" },
      { k: "Garantía", v: "6 meses Terramak Certified" },
    ],
  },
  {
    id: "v-xs123",
    cat: "vial",
    name: "Rodillo Vibratorio XS123PD",
    brand: "XCMG",
    type: "Rodillo",
    condition: "Usado",
    usage: "920 h · 2022",
    year: 2022,
    price: 61900,
    image: IMG.roller,
    flip: true,
    specs: ["12.3 t", "125 HP", "Tambor liso", "920 h"],
    ficha: [
      { k: "Motor", v: "Cummins QSB4.5" },
      { k: "Frecuencia de vibración", v: "28 / 33 Hz" },
      { k: "Historial", v: "Obra única, horas certificadas" },
      { k: "Garantía", v: "6 meses Terramak Certified" },
    ],
  },

  /* --------------------------- MAQUINARIA AGRÍCOLA --------------------------- */
  {
    id: "a-6110m",
    cat: "agro",
    name: "Tractor 6110M",
    brand: "John Deere",
    type: "Tractor",
    condition: "Usado",
    usage: "540 h · 2023",
    year: 2023,
    price: 64800,
    image: IMG.tractor,
    badge: "Más vendido",
    specs: ["110 HP", "4WD", "PowrQuad 24/24", "540 h"],
    ficha: [
      { k: "Motor", v: "PowerTech 4.5 L, 4 cilindros" },
      { k: "Levante trasero", v: "5,400 kg" },
      { k: "Historial", v: "Fundo único, bitácora completa" },
      { k: "Garantía", v: "12 meses Terramak Certified" },
    ],
  },
  {
    id: "a-t7190",
    cat: "agro",
    name: "Tractor T7.190",
    brand: "New Holland",
    type: "Tractor",
    condition: "Usado",
    usage: "870 h · 2022",
    year: 2022,
    price: 86500,
    image: IMG.tractor,
    flip: true,
    specs: ["165 HP", "4WD", "Full Powershift", "870 h"],
    ficha: [
      { k: "Motor", v: "NEF 6.7 L, Stage IIIA" },
      { k: "Transmisión", v: "18x6 Full Powershift" },
      { k: "Historial", v: "870 h certificadas, único dueño" },
      { k: "Garantía", v: "6 meses Terramak Certified" },
    ],
  },
  {
    id: "a-m7132",
    cat: "agro",
    name: "Tractor M7-132 Premium",
    brand: "Kubota",
    type: "Tractor",
    condition: "Usado",
    usage: "640 h · 2022",
    year: 2022,
    price: 74300,
    image: IMG.tractor,
    badge: "Revisado 200 pts",
    specs: ["130 HP", "4WD", "640 h", "Frontal incluido"],
    ficha: [
      { k: "Motor", v: "Kubota V6108, 6.1 L" },
      { k: "Transmisión", v: "Powershift 54/27" },
      { k: "Historial", v: "Fundo único en Ica, bitácora completa" },
      { k: "Garantía", v: "6 meses Terramak Certified" },
    ],
  },
  {
    id: "a-s770",
    cat: "agro",
    name: "Cosechadora S770",
    brand: "John Deere",
    type: "Cosechadora",
    condition: "Usado",
    usage: "430 h · 2023",
    year: 2023,
    price: 312000,
    image: IMG.harvester,
    badge: "Bajas horas",
    specs: ["373 HP", "Plataforma 35 ft", "Rotor doble", "430 h"],
    ficha: [
      { k: "Motor", v: "PowerTech 9.0 L" },
      { k: "Tanque de grano", v: "10,600 L" },
      { k: "Historial", v: "Campañas de maíz y soya, horas certificadas" },
      { k: "Garantía", v: "6 meses Terramak Certified" },
    ],
  },
  {
    id: "a-4130",
    cat: "agro",
    name: "Cosechadora Axial-Flow 4130",
    brand: "Case IH",
    type: "Cosechadora",
    condition: "Usado",
    usage: "1,100 h · 2021",
    year: 2021,
    price: 265000,
    image: IMG.harvester,
    flip: true,
    specs: ["315 HP", "Rotor axial", "1,100 h", "Plataforma 30 ft"],
    ficha: [
      { k: "Motor", v: "FPT Cursor 9" },
      { k: "Horas de trilla", v: "780 h certificadas" },
      { k: "Historial", v: "Arroz en Lambayeque, único dueño" },
      { k: "Garantía", v: "6 meses Terramak Certified" },
    ],
  },
  {
    id: "a-5075e",
    cat: "agro",
    name: "Tractor 5075E",
    brand: "John Deere",
    type: "Tractor",
    condition: "Usado",
    usage: "310 h · 2023",
    year: 2023,
    price: 35400,
    image: IMG.tractor,
    badge: "Bajas horas",
    specs: ["75 HP", "4WD", "SyncShuttle 12/12", "310 h"],
    ficha: [
      { k: "Motor", v: "PowerTech 2.9 L / 4 cilindros" },
      { k: "Levante trasero", v: "2,500 kg" },
      { k: "Historial", v: "310 h, único dueño, papeles al día" },
      { k: "Garantía", v: "12 meses Terramak Certified" },
    ],
  },

  /* ------------------------------- AUTOS ------------------------------- */
  {
    id: "c-hilux",
    cat: "autos",
    name: "Hilux 4x4 GLX Dúo Cabina",
    brand: "Toyota",
    type: "Pickup",
    condition: "Nuevo",
    usage: "0 km · 2025",
    year: 2025,
    price: 38900,
    image: IMG.pickup,
    badge: "Más vendida",
    specs: ["2.8 TD 204 HP", "4x4", "Mecánica 6 vel", "3 airbags"],
    ficha: [
      { k: "Motor", v: "1GD-FTV 2.8 L turbodiésel" },
      { k: "Capacidad de carga", v: "1,000 kg" },
      { k: "Garantía", v: "5 años / 150,000 km de fábrica" },
      { k: "Bonos", v: "Bono flotero desde 3 unidades" },
    ],
  },
  {
    id: "c-ranger",
    cat: "autos",
    name: "Ranger Limited 4x4",
    brand: "Ford",
    type: "Pickup",
    condition: "Usado",
    usage: "12,800 km · 2024",
    year: 2024,
    price: 35900,
    image: IMG.pickup,
    flip: true,
    badge: "Bajo kilometraje",
    specs: ["2.0 Bi-Turbo 210 HP", "4x4", "12,800 km", "Automática 10 vel"],
    ficha: [
      { k: "Motor", v: "EcoBlue 2.0 L Bi-Turbo" },
      { k: "Capacidad de carga", v: "1,050 kg" },
      { k: "Historial", v: "12,800 km, mantenimiento en concesionario" },
      { k: "Garantía", v: "12 meses Terramak Certified" },
    ],
  },
  {
    id: "c-dmax",
    cat: "autos",
    name: "D-Max High Power 4x4",
    brand: "Isuzu",
    type: "Pickup",
    condition: "Usado",
    usage: "22,000 km · 2023",
    year: 2023,
    price: 29800,
    image: IMG.pickup,
    badge: "Revisado 200 pts",
    specs: ["1.9 TD 150 HP", "4x4", "22,000 km", "Único dueño"],
    ficha: [
      { k: "Motor", v: "RZ4E 1.9 L turbodiésel" },
      { k: "Historial", v: "Flota corporativa, mantenimiento en concesionario" },
      { k: "Garantía", v: "12 meses Terramak Certified" },
      { k: "Entrega", v: "Inmediata, papeles al día" },
    ],
  },
  {
    id: "c-fortuner",
    cat: "autos",
    name: "Fortuner 4x4 Full Equipo",
    brand: "Toyota",
    type: "SUV",
    condition: "Usado",
    usage: "9,500 km · 2024",
    year: 2024,
    price: 44900,
    image: IMG.suv,
    badge: "Bajo kilometraje",
    specs: ["2.8 TD 204 HP", "4x4", "7 asientos", "9,500 km"],
    ficha: [
      { k: "Motor", v: "1GD-FTV 2.8 L" },
      { k: "Seguridad", v: "7 airbags, control de tracción A-TRC" },
      { k: "Historial", v: "9,500 km certificados, único dueño" },
      { k: "Garantía", v: "12 meses Terramak Certified" },
    ],
  },
  {
    id: "c-tucson",
    cat: "autos",
    name: "Tucson GLS AWD",
    brand: "Hyundai",
    type: "SUV",
    condition: "Nuevo",
    usage: "0 km · 2025",
    year: 2025,
    price: 34700,
    image: IMG.suv,
    flip: true,
    badge: "0 km",
    specs: ["1.6 Turbo 180 HP", "AWD", "DCT 7 vel", "Techo panorámico"],
    ficha: [
      { k: "Motor", v: "Gamma 1.6 T-GDi" },
      { k: "Seguridad", v: "6 airbags, frenado autónomo" },
      { k: "Garantía", v: "5 años / 150,000 km de fábrica" },
      { k: "Bonos", v: "Bono de financiamiento 0 km" },
    ],
  },
  {
    id: "c-montero",
    cat: "autos",
    name: "Montero Sport 4WD",
    brand: "Mitsubishi",
    type: "SUV",
    condition: "Usado",
    usage: "18,500 km · 2023",
    year: 2023,
    price: 31900,
    image: IMG.suv,
    badge: "Revisado 200 pts",
    specs: ["2.4 TD 181 HP", "4WD", "18,500 km", "Automática 8 vel"],
    ficha: [
      { k: "Motor", v: "4N15 2.4 L MIVEC turbodiésel" },
      { k: "Historial", v: "Uso particular, kms certificados" },
      { k: "Garantía", v: "12 meses Terramak Certified" },
      { k: "Entrega", v: "Inmediata, transferencia en el día" },
    ],
  },
];

export const productsByCat = (cat: CategoryId) => PRODUCTS.filter((p) => p.cat === cat);

export const fmtPrice = (n: number) => "US$ " + n.toLocaleString("en-US");

export const waLink = (text: string) =>
  `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(text)}`;

export const BRANDS_MARQUEE = [
  "Caterpillar",
  "John Deere",
  "Komatsu",
  "Toyota",
  "New Holland",
  "SANY",
  "Case IH",
  "Ford",
  "XCMG",
  "Kubota",
  "Hyundai",
  "Isuzu",
  "Mitsubishi",
];

export const TESTIMONIALS = [
  {
    quote:
      "Compramos dos excavadoras 320 GC usadas certificadas: llegaron con las horas comprobadas y la inspección de 200 puntos firmada. El taller respondió en campo la misma semana que tuvimos una alerta. Así da gusto trabajar.",
    name: "Ricardo Salas",
    role: "Gerente General",
    company: "Constructora Salas & Hijos",
    cat: "vial" as CategoryId,
  },
  {
    quote:
      "El tractor 6110M llegó antes de la campaña con su bitácora completa y el asesor nos capacitó a los operadores sin costo. Las cuotas quedaron calzadas con la cosecha, tal como lo prometieron.",
    name: "María Campos",
    role: "Administradora",
    company: "Agrícola Camposur, Ica",
    cat: "agro" as CategoryId,
  },
  {
    quote:
      "Renovamos la flota con ocho Hilux — seis certificadas y dos 0 km. Bono de flotero real, entrega programada y mantenimiento sin sorpresas. Terramak se ganó un cliente de largo plazo.",
    name: "Jorge Paredes",
    role: "Jefe de Logística",
    company: "Minera Andahuasi",
    cat: "autos" as CategoryId,
  },
];
