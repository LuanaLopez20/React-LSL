import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';

export default function Inventario() {
  const [newProduct, setNewProduct] = useState('');

  const handleAddProduct = () => {
    // Lógica para agregar un producto al inventario
    console.log(`Producto ${newProduct} agregado al inventario`);
    setNewProduct('');
  };

  return (
    <Box>
      <Typography variant="h6">Inventario</Typography>
      <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
        <Typography>Agregar nuevo producto</Typography>
        <TextField
          label="Nombre del Producto"
          variant="outlined"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          onClick={handleAddProduct}
        >
          Agregar Producto
        </Button>
      </Paper>
    </Box>
  );
}
