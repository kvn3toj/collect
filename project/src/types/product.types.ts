export interface Product {
  id: string;
  codigo?: string;
  name?: string;
  nombre?: string;
  description?: string;
  descripcion?: string;
  shortDescription?: string;
  descripcionCorta?: string;
  price?: number;
  precio?: number;
  discountPrice?: number;
  images?: string[];
  imagenesPrincipales?: string[];
  imagenesDetalle?: string[];
  category?: string;
  tipoJoya?: string;
  tipoMetal?: string | null;
  corteEsmeralda?: string;
  calidadEsmeralda?: string;
  origenEsmeralda?: string;
  quilatesEsmeralda?: number;
  stock: number;
  enStock?: boolean;
  destacado?: boolean;
  tags?: string[];
  slug?: string;
  specifications?: Record<string, string>;
  customizationOptions?: CustomizationOption[];
  createdAt: string;
  updatedAt: string;
}

export interface CustomizationOption {
  id: string;
  name: string;
  type: 'metal' | 'setting' | 'size' | 'engraving' | 'gemstone';
  options: {
    id: string;
    name: string;
    description?: string;
    image?: string;
    priceAdjustment: number;
  }[];
}

export interface ProductFilter {
  category?: string;
  metal?: string;
  priceRange?: [number, number];
  searchQuery?: string;
  sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'popularity';
  tags?: string[];
  inStock?: boolean;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  customizations?: Record<string, string>;
  totalPrice: number;
}

export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}