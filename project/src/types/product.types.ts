/**
 * Interfaz principal para un producto
 */
export interface Product {
  id: string;
  codigo: string;
  name: string;
  nombre: string;
  description: string;
  descripcion: string;
  shortDescription: string;
  descripcionCorta: string;
  price: number;
  precio: number;
  discountPrice?: number;
  images: string[];
  imagenesPrincipales: string[];
  imagenesDetalle: string[];
  category: string;
  tipoJoya: string;
  tipoMetal: string | null;
  corteEsmeralda?: string;
  calidadEsmeralda?: string;
  origenEsmeralda?: string;
  quilatesEsmeralda?: number;
  piedras?: number;
  stock: number;
  enStock: boolean;
  destacado: boolean;
  tags: string[];
  slug: string;
  specifications: Record<string, string | number>;
  customizationOptions?: CustomizationOption[];
  createdAt: string;
  updatedAt: string;
  video?: string;
  certificadoURL?: string;
  metaTitle?: string;
  metaDescription?: string;
}

/**
 * Tipos de joyas disponibles
 */
export type JewelryType = {
  id: string;
  name: string;
  description?: string;
};

/**
 * Tipos de metales disponibles
 */
export type Metal = {
  id: string;
  name: string;
  description?: string;
  color?: string;
};

/**
 * Categorías de productos
 */
export type Category = {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
};

/**
 * Opciones de personalización para productos
 */
export interface CustomizationOption {
  id: string;
  name: string;
  type: CustomizationType;
  options: CustomizationOptionValue[];
}

export type CustomizationType = 'metal' | 'setting' | 'size' | 'engraving' | 'gemstone';

/**
 * Valor específico para una opción de personalización
 */
export interface CustomizationOptionValue {
  id: string;
  name: string;
  description?: string;
  image?: string;
  priceAdjustment: number;
}

/**
 * Filtros para la búsqueda y visualización de productos
 */
export interface ProductFilter {
  category?: string;
  metal?: string;
  priceRange?: [number, number];
  searchQuery?: string;
  sortBy?: ProductSortOption;
  tags?: string[];
  inStock?: boolean;
}

export type ProductSortOption = 'price-asc' | 'price-desc' | 'newest' | 'popularity';

/**
 * Elemento en el carrito de compras
 */
export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  customizations?: Record<string, string>;
  totalPrice: number;
}

/**
 * Reseña de un producto
 */
export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

/**
 * Especificaciones de la esmeralda
 */
export interface EmeraldSpecifications {
  cut?: string;       // corteEsmeralda
  quality?: string;   // calidadEsmeralda
  origin?: string;    // origenEsmeralda
  carats?: number;    // quilatesEsmeralda
  stones?: number;    // piedras
}