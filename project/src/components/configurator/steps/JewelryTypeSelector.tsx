import { Box, Button, Card, CardContent, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useConfiguratorStore } from '../../../stores/configuratorStore';

interface JewelryType {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface JewelryTypeSelectorProps {
  options: JewelryType[];
  selected: string | null;
  onSelect: (type: string) => void;
  onNext: () => void;
}

export const JewelryTypeSelector = ({
  options,
  selected,
  onSelect,
  onNext,
}: JewelryTypeSelectorProps) => {
  const theme = useTheme();
  const { setLoading } = useConfiguratorStore();

  const handleSelect = (type: string) => {
    setLoading(true);
    onSelect(type);
    // Simulate loading state for 3D model update
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      {/* Options Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
          },
          gap: 2,
        }}
      >
        {options?.map((type) => (
          <Card
            key={type.id}
            component={motion.div}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(type.id)}
            sx={{
              cursor: 'pointer',
              bgcolor: selected === type.id ? 'action.selected' : 'background.paper',
              border: 1,
              borderColor: selected === type.id ? 'primary.main' : 'divider',
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: 'primary.main',
                boxShadow: 1,
              },
            }}
          >
            <CardContent
              sx={{
                p: 2,
                '&:last-child': {
                  pb: 2,
                },
              }}
            >
              {/* Type Image */}
              <Box
                sx={{
                  width: '100%',
                  height: 120,
                  bgcolor: 'background.default',
                  borderRadius: 1,
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={type.image}
                  alt={type.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>

              {/* Type Info */}
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'Playfair Display',
                  color: 'text.primary',
                  mb: 1,
                }}
              >
                {type.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  mb: 2,
                }}
              >
                {type.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Next Button */}
      <Button
        variant="contained"
        disabled={!selected}
        onClick={onNext}
        sx={{
          bgcolor: theme.palette.primary.main,
          color: 'white',
          '&:hover': {
            bgcolor: theme.palette.primary.dark,
          },
          height: 48,
          borderRadius: 1,
          textTransform: 'none',
          fontFamily: 'Lato',
          fontWeight: 500,
        }}
      >
        Continuar
      </Button>
    </Box>
  );
}; 