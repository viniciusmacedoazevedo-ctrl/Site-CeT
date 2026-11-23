export type Unit = {
  id: "campina-grande" | "joao-pessoa";
  city: string;
  state: "PB";
  street: string;
  number: string;
  district: string;
  /** CEP informado no briefing. Ver observação em docs/pendencias.md. */
  postalCode: string;
  phones: { display: string; tel: string }[];
  /** WhatsApp exclusivo da unidade, quando houver. */
  whatsapp: string | null;
  /**
   * Coordenadas [longitude, latitude].
   * Derivadas do mapa incorporado no site atual e ajustadas sobre o traçado
   * da via no OpenStreetMap. Conferir no local antes da publicação.
   */
  coordinates: [number, number];
  photos: { src: string; alt: string }[];
  /** Ângulo inicial da câmera no mapa 3D. */
  camera: { bearing: number; pitch: number; zoom: number };
};

export const units: Unit[] = [
  {
    id: "campina-grande",
    city: "Campina Grande",
    state: "PB",
    street: "Rua José Elpídio da Costa Monteiro",
    number: "107",
    district: "São José",
    postalCode: "58108-590",
    phones: [
      { display: "(83) 3341-4134", tel: "+558333414134" },
      { display: "(83) 3341-6435", tel: "+558333416435" },
    ],
    whatsapp: null,
    coordinates: [-35.89604, -7.22804],
    photos: [
      { src: "/images/units/campina-grande-1.webp", alt: "Recepção e salas envidraçadas da unidade Campina Grande" },
      { src: "/images/units/campina-grande-2.webp", alt: "Sala de reuniões da unidade Campina Grande" },
    ],
    camera: { bearing: -28, pitch: 58, zoom: 16.6 },
  },
  {
    id: "joao-pessoa",
    city: "João Pessoa",
    state: "PB",
    street: "Avenida Mato Grosso",
    number: "879",
    district: "Bairro dos Estados",
    postalCode: "58030-080",
    phones: [{ display: "(83) 3330-0748", tel: "+558333300748" }],
    whatsapp: null,
    coordinates: [-34.85336, -7.11556],
    photos: [
      { src: "/images/units/joao-pessoa-1.webp", alt: "Fachada iluminada da unidade João Pessoa" },
      { src: "/images/units/joao-pessoa-2.webp", alt: "Recepção da unidade João Pessoa com o símbolo C&T" },
    ],
    camera: { bearing: 32, pitch: 58, zoom: 16.6 },
  },
];

export function fullAddress(u: Unit) {
  return `${u.street}, ${u.number} - ${u.district}, ${u.city} - ${u.state}, ${u.postalCode}`;
}

/** Busca pelo endereço textual: não depende da precisão das coordenadas. */
export function googleMapsSearch(u: Unit) {
  const q = `C&T Consultores e Associados, ${u.street}, ${u.number}, ${u.district}, ${u.city} - ${u.state}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

export function googleMapsDirections(u: Unit) {
  const dest = `${u.street}, ${u.number}, ${u.district}, ${u.city} - ${u.state}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(dest)}`;
}
