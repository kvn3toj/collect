import { Box, Typography, useTheme } from '@mui/material';
import { useConfiguratorStore } from '../../stores/configuratorStore';
import { motion, AnimatePresence } from 'framer-motion';
import { JewelryTypeSelector } from './steps/JewelryTypeSelector';
import { MetalSelector } from './steps/MetalSelector';
import { EmeraldSelector } from './steps/EmeraldSelector';
import { SettingSelector } from './steps/SettingSelector';
import { EngravingSelector } from './steps/EngravingSelector';
import { ConfiguratorReview } from './steps/ConfiguratorReview';

interface ConfiguratorControlsProps {
  options: any; // TODO: Type this properly
  isLoading: boolean;
}

const CONFIGURATOR_STEPS = [
  'Tipo de Joya',
  'Metal',
  'Esmeralda',
  'Engaste',
  'Grabado',
  'Revisión',
];

export const ConfiguratorControls = ({ options, isLoading }: ConfiguratorControlsProps) => {
  const theme = useTheme();
  const { currentStep, config, setCurrentStep, updateConfig } = useConfiguratorStore();

  const handleNext = () => {
    if (currentStep < CONFIGURATOR_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <JewelryTypeSelector
            options={options?.jewelryTypes}
            selected={config.jewelryType}
            onSelect={(type) => updateConfig({ jewelryType: type })}
            onNext={handleNext}
          />
        );
      case 1:
        return (
          <MetalSelector
            options={options?.metals}
            selected={config.metal}
            onSelect={(metal) => updateConfig({ metal })}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <EmeraldSelector
            options={options?.emeralds}
            selected={config.emerald}
            onSelect={(emerald) => updateConfig({ emerald })}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <SettingSelector
            options={options?.settings}
            selected={config.setting}
            onSelect={(setting) => updateConfig({ setting })}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <EngravingSelector
            selected={config.engraving}
            onSelect={(engraving) => updateConfig({ engraving })}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 5:
        return <ConfiguratorReview config={config} onBack={handleBack} />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        p: 3,
      }}
    >
      {/* Step Title */}
      <Typography
        variant="h6"
        sx={{
          fontFamily: 'Playfair Display',
          color: 'text.primary',
          mb: 3,
        }}
      >
        {CONFIGURATOR_STEPS[currentStep]}
      </Typography>

      {/* Step Content */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          position: 'relative',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
}; 