import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';

export default function Pedidos() {
  const handleMarkAsShipped = (orderId) => {
    // Lógica para marcar un pedido como enviado
    console.log(`Pedido ${orderId} enviado`);
  };

  return (
    <Box>
      <Typography variant="h6">Pedidos Recientes</Typography>
      <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
        <Typography>Pedido #1234</Typography>
        <Typography>Producto: Galletas de chocolate</Typography>
        <Typography>Cantidad: 2</Typography>
        <Button
          variant="contained"
          color="success"
          onClick={() => handleMarkAsShipped(1234)}
        >
          Marcar como Enviado
        </Button>
      </Paper>
      <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
        <Typography>Pedido #1235</Typography>
        <Typography>Producto: Galletas de vainilla</Typography>
        <Typography>Cantidad: 3</Typography>
        <Button
          variant="contained"
          color="success"
          onClick={() => handleMarkAsShipped(1235)}
        >
          Marcar como Enviado
        </Button>
      </Paper>
    </Box>
  );
}
