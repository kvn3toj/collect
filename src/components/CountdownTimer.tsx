import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface TimeUnitProps {
  value: number;
  label: string;
}

const TimeUnit: React.FC<TimeUnitProps> = ({ value, label }) => (
  <Box 
    sx={{ 
      textAlign: 'center', 
      p: 1, 
      border: 1, 
      borderColor: 'divider', 
      borderRadius: '50%', 
      width: 80, 
      height: 80, 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      mx: 1
    }}
  >
    <Typography variant="h4" component="div" color="secondary">
      {String(value).padStart(2, '0')}
    </Typography>
    <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', mt: 0.5 }}>
      {label}
    </Typography>
  </Box>
);

interface CountdownTimerProps {
  targetDate: Date;
}

const calculateTimeLeft = (targetDate: Date): TimeLeft => {
  const difference = +new Date(targetDate) - +new Date();
  let timeLeft: TimeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, timeLeft]);

  const timerComponents: JSX.Element[] = [];
  Object.entries(timeLeft).forEach(([interval, value]) => {
    // No mostrar 0s al inicio si no hay tiempo restante
    if (!value && interval !== 'seconds' && timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0) {
      return;
    }
    timerComponents.push(
      <Grid item key={interval}>
        <TimeUnit value={value} label={interval} />
      </Grid>
    );
  });

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
      <Grid container spacing={1} justifyContent="center">
        {timerComponents.length ? timerComponents : <Typography>¡La oferta ha terminado!</Typography>}
      </Grid>
    </Box>
  );
} 