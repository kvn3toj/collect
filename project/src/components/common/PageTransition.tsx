import React from 'react';
import { Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
          opacity: { duration: 0.3 }
        }}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative'
        }}
      >
        <Box
          sx={{
            minHeight: '100%',
            width: '100%',
            bgcolor: 'background.default',
            position: 'relative',
            zIndex: 1
          }}
        >
          {children}
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition; 