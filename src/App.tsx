import { useEffect, useState } from 'react';
// import { useState } from 'react'
import StickyHeadTable from './components/StickyHeadTable';
import { Box, Typography } from '@mui/material';

function App() {
  const [emails, setEmails] = useState({"mails":[{"from":"Maria José Medina Ruiz","date":"2025-05-20","subject":"Prueba de correo","summary":"Hola, mi nombre es Maria José, estoy probando este contacto"}]});

  // const fetchEmails = async () => {
  //   try {
  //     const response = await fetch('https://tu-n8n/webhook/emails');
  //     const data = await response.json();
  //     setEmails(data);
  //   } catch (error) {
  //     console.error('Error al obtener correos:', error);
  //   }
  // };

  useEffect(() => {
    setEmails({
    "mails":
    [
      {"from":"Maria José Medina Ruiz","date":"2025-05-20","subject":"Prueba de correo","summary":"Hola, mi nombre es Maria José, estoy probando este contacto"},
      {"from":"Maria José Medina Ruiz","date":"2025-05-21","subject":"Prueba de correo2","summary":"Hola, podrias darme información sobre esta página?"},
      {"from":"Maria José Medina Ruiz","date":"2025-05-20","subject":"Prueba de correo3","summary":"Hola, solicito documentos"}
    ]});
    // fetchEmails();

    // const interval = setInterval(fetchEmails, 30000);
    // return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 4,
      }}
    >
      <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontFamily: "'Montserrat', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
        MANEJADOR DE MAILS
      </Typography>
      <StickyHeadTable rows={emails.mails} />
    </Box>
  );
}

export default App;