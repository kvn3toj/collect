export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  type: 'ticket' | 'emerald';
  price: number;
  carat?: number;
  pricePerCarat?: number;
  returnRate?: number;
  duration?: number;
  ticketValue?: number;
}

export const products: Product[] = [
  {
    id: "730",
    name: "Esmeralda Colombiana 0.92ct",
    description: "Esmeralda natural colombiana certificada, de excelente color y claridad.",
    image: "/images/products/emerald-730.png",
    type: "emerald",
    price: 23000,
    carat: 0.92,
    pricePerCarat: 25000
  },
  {
    id: "731",
    name: "Esmeralda Natural 1.39ct",
    description: "Esmeralda de alta calidad, tratamiento de aceite menor (Minor).",
    image: "/images/products/emerald-731.png",
    type: "emerald",
    price: 25854,
    carat: 1.39,
    pricePerCarat: 18600
  },
  {
    id: "732",
    name: "Esmeralda Excepcional 3.87ct",
    description: "Impresionante esmeralda colombiana de gran tamaño y calidad.",
    image: "/images/products/emerald-732.png",
    type: "emerald",
    price: 96750,
    carat: 3.87,
    pricePerCarat: 25000
  },
  {
    id: "investment-ticket",
    name: "Ticket de Inversión ARE Trüst",
    description: "Participa como inversionista y recibe los beneficios de construir negocios éticos entre personas confiables.",
    image: "/images/products/ticket-visual.png",
    type: "ticket",
    price: 8000,
    returnRate: 17,
    duration: 17,
    ticketValue: 8000
  }
]; 