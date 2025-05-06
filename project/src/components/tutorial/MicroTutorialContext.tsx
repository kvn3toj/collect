import React, { createContext, useState } from 'react';

// Contexto para gestionar la prioridad de tutoriales
export const MicroTutorialContext = createContext<{
  activeTutorial: string | null;
  activeTutorialPriority: number;
  setActiveTutorial: (id: string | null, priority?: number) => void;
  pauseAutoTutorials: boolean;
  setPauseAutoTutorials: (paused: boolean) => void;
}>({
  activeTutorial: null,
  activeTutorialPriority: 0,
  setActiveTutorial: () => {},
  pauseAutoTutorials: false,
  setPauseAutoTutorials: () => {}
});

// Provider para el contexto
export const MicroTutorialProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [activeTutorial, setActiveTutorial] = useState<string | null>(null);
  const [activeTutorialPriority, setActiveTutorialPriority] = useState<number>(0);
  const [pauseAutoTutorials, setPauseAutoTutorials] = useState<boolean>(false);
  
  // Solo permitimos cambiar el tutorial activo si no hay uno activo, si es el mismo o si tiene mayor prioridad
  const safeSetActiveTutorial = (id: string | null, priority: number = 0) => {
    if (id === null) {
      // Si estamos cerrando, siempre permitimos
      setActiveTutorial(null);
      setActiveTutorialPriority(0);
      return;
    }
    
    setActiveTutorial(prev => {
      // Si no hay ninguno activo o es el mismo, lo actualizamos
      if (prev === null || prev === id) {
        setActiveTutorialPriority(priority);
        return id;
      }
      
      // Si hay uno activo, comprobamos prioridades
      if (priority > activeTutorialPriority) {
        // El nuevo tiene mayor prioridad, reemplazamos
        console.log(`Tutorial ${id} con prioridad ${priority} reemplaza a ${prev} con prioridad ${activeTutorialPriority}`);
        setActiveTutorialPriority(priority);
        return id;
      }
      
      // Mantenemos el actual que tiene mayor prioridad
      console.log(`Tutorial ${id} con prioridad ${priority} bloqueado por ${prev} con prioridad ${activeTutorialPriority}`);
      return prev;
    });
  };
  
  return (
    <MicroTutorialContext.Provider value={{ 
      activeTutorial, 
      activeTutorialPriority,
      setActiveTutorial: safeSetActiveTutorial,
      pauseAutoTutorials,
      setPauseAutoTutorials
    }}>
      {children}
    </MicroTutorialContext.Provider>
  );
}; 