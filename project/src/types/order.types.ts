/**
 * Pedido completo
 */
export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  items: OrderItem[];
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  billingAddress: BillingAddress;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  subtotal: number;
  tax: number;
  shippingCost: number;
  discount: number;
  total: number;
  notes?: string;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Ítem individual dentro de un pedido
 */
export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  customizations?: Record<string, string>;
}

/**
 * Tipos de estado de un pedido
 */
export type OrderStatus = 
  | 'pending'      // Pendiente
  | 'processing'   // En procesamiento
  | 'shipped'      // Enviado
  | 'delivered'    // Entregado
  | 'cancelled'    // Cancelado
  | 'refunded';    // Reembolsado

/**
 * Estados de pago
 */
export type PaymentStatus = 
  | 'pending'              // Pendiente
  | 'paid'                 // Pagado
  | 'failed'               // Fallido
  | 'refunded'             // Reembolsado
  | 'partially_refunded';  // Parcialmente reembolsado

/**
 * Métodos de pago disponibles
 */
export type PaymentMethod = 
  | 'credit_card'    // Tarjeta de crédito
  | 'paypal'         // PayPal
  | 'bank_transfer'  // Transferencia bancaria
  | 'crypto';        // Criptomonedas

/**
 * Base para direcciones (tanto envío como facturación)
 */
export interface BaseAddress {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
}

/**
 * Dirección de envío
 */
export interface ShippingAddress extends BaseAddress {}

/**
 * Dirección de facturación
 */
export interface BillingAddress extends BaseAddress {}

/**
 * Resumen de un pedido (para listados)
 */
export interface OrderSummary {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  total: number;
  itemCount: number;
}

/**
 * Datos para la creación de un nuevo pedido
 */
export interface CreateOrderData {
  items: Array<{
    productId: string;
    quantity: number;
    customizations?: Record<string, string>;
  }>;
  shippingAddressId?: string;
  billingAddressId?: string;
  shippingAddress?: Omit<ShippingAddress, 'id'>;
  billingAddress?: Omit<BillingAddress, 'id'>;
  paymentMethod: PaymentMethod;
  notes?: string;
}

/**
 * Detalles del envío
 */
export interface ShippingDetails {
  carrier: string;
  trackingNumber: string;
  estimatedDelivery?: string;
  shippedAt: string;
  trackingUrl?: string;
}