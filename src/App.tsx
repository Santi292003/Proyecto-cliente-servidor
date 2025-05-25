import { useEffect, useState } from "react";
// import { useState } from 'react'
import StickyHeadTable from "./components/StickyHeadTable";
import { Box, Typography } from "@mui/material";

function App() {
  const [emails, setEmails] = useState({ mails: [] });

  const fetchEmails = async () => {
    try {
      const response = await fetch(
        "https://wise-teaching-bat.ngrok-free.app/webhook-test/emails",
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      const data = await response.json();
      setEmails(data);
    } catch (error) {
      console.error("Error al obtener correos:", error);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 4,
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          fontFamily:
            "'Montserrat', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        MANEJADOR DE MAILS
      </Typography>
      <StickyHeadTable rows={emails.mails} />
    </Box>
  );
}

export default App;
