import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';
import theme from '../theme';
import Head from 'next/head';
import Layout from '../components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ARE Trüst - Inversión en Esmeraldas</title>
        <meta name="description" content="Inversión en esmeraldas colombianas certificadas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://aretrust.store" />
        <meta property="og:url" content="https://aretrust.store" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="ARE Trüst - Inversión en Esmeraldas" />
        <meta property="og:description" content="Inversión en esmeraldas colombianas certificadas" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;500;700&family=Playfair+Display:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
} 