import { FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'next/link';

interface Product {
  id: string;
  reportId?: number;
  name: string;
  description: string;
  imageUrl: string;
  carat: number | null;
  pricePerCarat: number | null;
  totalPrice: number;
  isTicket: boolean;
  benefits?: string[];
  prontoPagoBenefit?: string;
  bulkBenefit?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const displayPrice = product.totalPrice ? `$${product.totalPrice.toLocaleString('en-US')} USD` : 'Consultar';

  return (
    <Link href={`/tickets/${product.id}`} passHref legacyBehavior>
      <Card sx={{
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3
        }
      }}>
        <CardMedia
          component="img"
          height="220"
          image={product.imageUrl}
          alt={product.name}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Typography gutterBottom variant="h6" component="div" sx={{ mb: 1 }}>
            {product.name}
          </Typography>

          <Box>
            {!product.isTicket && product.carat && (
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
                {product.carat.toFixed(2)} Ct
              </Typography>
            )}

            {!product.isTicket && product.pricePerCarat && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                (${product.pricePerCarat.toLocaleString('en-US')}/Ct)
              </Typography>
            )}

            <Typography variant="h5" color="primary" component="p">
              {displayPrice}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard; 