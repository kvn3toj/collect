import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useTheme,
  Tooltip,
  Fade,
} from '@mui/material';
import {
  Edit2,
  Trash2,
  Share2,
  DollarSign,
  Calendar,
  Check,
  X,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Design } from '../../services/atelier.service';
import atelierService from '../../services/atelier.service';
import QuoteRequestModal from '../customizer/QuoteRequestModal';

interface AtelierDesignCardProps {
  design: Design;
}

const AtelierDesignCard: React.FC<AtelierDesignCardProps> = ({ design }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(design.name);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const updateMutation = useMutation({
    mutationFn: (name: string) => 
      atelierService.updateDesign(design.id, { name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myDesigns'] });
      setIsEditing(false);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: () => atelierService.deleteDesign(design.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myDesigns'] });
      setShowDeleteDialog(false);
    }
  });

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedName.trim() && editedName !== design.name) {
      updateMutation.mutate(editedName);
    } else {
      setIsEditing(false);
      setEditedName(design.name);
    }
  };

  const handleEdit = () => {
    navigate(`/customize/${design.id}`);
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    console.log('Share design:', design.id);
  };

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          bgcolor: 'background.paper',
          borderRadius: 1,
          overflow: 'hidden',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            '& .action-buttons': {
              opacity: 1,
            }
          }
        }}
      >
        {/* Preview Image */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            paddingTop: '100%',
            bgcolor: 'background.default',
            cursor: 'pointer',
          }}
          onClick={handleEdit}
        >
          {design.previewUrl ? (
            <Box
              component="img"
              src={design.previewUrl}
              alt={design.name}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontFamily: 'Lato',
                  fontWeight: 300,
                  letterSpacing: 0.5,
                }}
              >
                Vista previa no disponible
              </Typography>
            </Box>
          )}
        </Box>

        {/* Content */}
        <Box sx={{ p: 2 }}>
          {/* Name */}
          {isEditing ? (
            <form onSubmit={handleNameSubmit}>
              <TextField
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                onBlur={handleNameSubmit}
                variant="standard"
                fullWidth
                autoFocus
                sx={{
                  '& .MuiInputBase-root': {
                    fontFamily: 'Playfair Display',
                    fontWeight: 500,
                    fontSize: '1.1rem',
                  }
                }}
              />
            </form>
          ) : (
            <Typography
              variant="h6"
              fontFamily="Playfair Display"
              sx={{
                fontWeight: 500,
                letterSpacing: 0.5,
                mb: 1,
                cursor: 'pointer',
              }}
              onClick={() => setIsEditing(true)}
            >
              {design.name}
            </Typography>
          )}

          {/* Date */}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              fontFamily: 'Lato',
              fontWeight: 300,
              letterSpacing: 0.5,
            }}
          >
            <Calendar size={14} />
            {format(new Date(design.createdAt), "d 'de' MMMM, yyyy", { locale: es })}
          </Typography>

          {/* Specifications */}
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontFamily: 'Lato',
                fontWeight: 300,
                letterSpacing: 0.5,
                mb: 0.5,
              }}
            >
              • {design.customization.type}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontFamily: 'Lato',
                fontWeight: 300,
                letterSpacing: 0.5,
                mb: 0.5,
              }}
            >
              • {design.customization.metal.type} ({design.customization.metal.weight}g)
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontFamily: 'Lato',
                fontWeight: 300,
                letterSpacing: 0.5,
              }}
            >
              • {design.customization.emerald.quality} de {design.customization.emerald.origin}
            </Typography>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box
          className="action-buttons"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            display: 'flex',
            gap: 1,
            opacity: 0,
            transition: 'opacity 0.2s ease-in-out',
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 1,
            p: 0.5,
          }}
        >
          <Tooltip title="Editar" placement="top">
            <IconButton
              size="small"
              onClick={handleEdit}
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'text.primary',
                  bgcolor: 'rgba(0, 0, 0, 0.04)',
                }
              }}
            >
              <Edit2 size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Solicitar Cotización" placement="top">
            <IconButton
              size="small"
              onClick={() => setShowQuoteModal(true)}
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'text.primary',
                  bgcolor: 'rgba(0, 0, 0, 0.04)',
                }
              }}
            >
              <DollarSign size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Compartir" placement="top">
            <IconButton
              size="small"
              onClick={handleShare}
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'text.primary',
                  bgcolor: 'rgba(0, 0, 0, 0.04)',
                }
              }}
            >
              <Share2 size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar" placement="top">
            <IconButton
              size="small"
              onClick={() => setShowDeleteDialog(true)}
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'error.main',
                  bgcolor: 'rgba(211, 47, 47, 0.04)',
                }
              }}
            >
              <Trash2 size={16} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 1,
            boxShadow: 'none',
            border: '1px solid',
            borderColor: 'divider',
          }
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: 'Playfair Display',
            fontWeight: 500,
            letterSpacing: 0.5,
          }}
        >
          Eliminar Diseño
        </DialogTitle>
        <DialogContent>
          <Typography
            sx={{
              fontFamily: 'Lato',
              fontWeight: 300,
              letterSpacing: 0.5,
            }}
          >
            ¿Estás seguro de que deseas eliminar este diseño? Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={() => setShowDeleteDialog(false)}
            startIcon={<X size={20} />}
            sx={{
              textTransform: 'none',
              fontFamily: 'Lato',
              fontWeight: 500,
              letterSpacing: 0.5,
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={() => deleteMutation.mutate()}
            variant="contained"
            color="error"
            startIcon={<Trash2 size={20} />}
            disabled={deleteMutation.isPending}
            sx={{
              textTransform: 'none',
              fontFamily: 'Lato',
              fontWeight: 500,
              letterSpacing: 0.5,
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 'none',
              }
            }}
          >
            {deleteMutation.isPending ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Quote Request Modal */}
      <QuoteRequestModal
        open={showQuoteModal}
        onClose={() => setShowQuoteModal(false)}
        customization={design.customization}
      />
    </>
  );
};

export default AtelierDesignCard; 