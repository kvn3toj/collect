import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/productService';
import { Product } from '../types/product.types';

export const useProduct = (id?: string) => {
  return useQuery<Product, Error>({
    queryKey: ['product', id],
    queryFn: () => {
      if (!id) throw new Error('No product ID provided');
      return productService.getProductById(id);
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}; 