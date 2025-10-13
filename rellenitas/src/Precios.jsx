import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';

export default function Precios() {
  const [newPrice, setNewPrice] = useState('');
  const [product, setProduct] = useState('');

  const handleChangePrice = () => {
    // Lógica para cambiar el precio de un producto
    console.log(`Precio del producto ${product} cambiado a ${newPrice}`);
    setNewPrice('');
    setProduct('');
  };

  return (
    <Box>
      <Typography variant="h6">Ajustar Precios</Typography>
      <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
        <Typography>Cambiar precio de producto</Typography>
        <TextField
          label="Producto"
          variant="outlined"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          fullWidth
        />
        <TextField
          label="Nuevo Precio"
          variant="outlined"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          fullWidth
          sx={{ marginTop: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          onClick={handleChangePrice}
        >
          Cambiar Precio
        </Button>
      </Paper>
    </Box>
  );
}
