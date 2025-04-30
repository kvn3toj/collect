import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

interface TicketCellProps {
  isAvailable: boolean;
  isLogo: boolean;
}

const TicketCell = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isAvailable' && prop !== 'isLogo',
})<TicketCellProps>(({ theme, isAvailable, isLogo }) => ({
  border: `2px solid ${isLogo ? theme.palette.secondary.main : theme.palette.divider}`,
  background: isLogo ? theme.palette.primary.main : 'transparent',
  opacity: isAvailable || isLogo ? 1 : 0.4,
  borderRadius: theme.shape.borderRadius,
  width: 80,
  height: 80,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: theme.spacing(0.5),
  position: 'relative',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: isAvailable ? 'scale(1.05)' : 'none',
    boxShadow: isAvailable ? theme.shadows[4] : 'none',
  },
}));

interface TicketGridProps {
  availableTickets?: number[];
}

export default function TicketGrid({ availableTickets = [] }: TicketGridProps) {
  const totalTickets = 26; // Número total de espacios en el grid

  return (
    <Box sx={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      justifyContent: 'center', 
      maxWidth: 600, 
      mx: 'auto',
      gap: 1
    }}>
      {[...Array(totalTickets)].map((_, index) => {
        const ticketNumber = index + 1; // Los números van de 1 a 26
        const isAvailable = availableTickets.includes(ticketNumber);
        const isLogoCell = index === 0; // El primer espacio es para el logo

        return (
          <TicketCell 
            key={index} 
            isAvailable={isAvailable} 
            isLogo={isLogoCell}
            component="div"
          >
            {isLogoCell ? (
              <Image 
                src="/images/logos/white/aretrust-symbol.png" 
                alt="ARE Trüst" 
                width={40} 
                height={40}
                priority
              />
            ) : (
              <Typography 
                variant="h6" 
                color={isAvailable ? "secondary.main" : "text.disabled"}
                sx={{ 
                  fontWeight: isAvailable ? 'bold' : 'normal',
                  transition: 'all 0.3s ease'
                }}
              >
                {ticketNumber}
              </Typography>
            )}
          </TicketCell>
        );
      })}
    </Box>
  );
} 