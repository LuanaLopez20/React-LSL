import React, { useState } from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";

export default function Precios({ productos, onPrecioChange }) {
  const [nuevoPrecio, setNuevoPrecio] = useState({});

  // Manejar el cambio de precio para un producto
  const handlePrecioChange = (id) => {
    if (nuevoPrecio[id] && !isNaN(nuevoPrecio[id])) {
      onPrecioChange(id, parseFloat(nuevoPrecio[id])); // Llamamos a la función pasada como prop para actualizar el precio
      setNuevoPrecio({ ...nuevoPrecio, [id]: "" }); // Limpiamos el campo de entrada
    } else {
      alert("Por favor ingrese un precio válido");
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6">Modificar Precios</Typography>

      {productos.map((producto) => (
        <Paper key={producto.id} sx={{ padding: 2, marginTop: 2 }}>
          <Typography>Producto: {producto.nombre}</Typography>
          <Typography>Precio actual: ${producto.precio}</Typography>

          <TextField
            label="Nuevo Precio"
            value={nuevoPrecio[producto.id] || ""}
            onChange={(e) =>
              setNuevoPrecio({ ...nuevoPrecio, [producto.id]: e.target.value })
            }
            fullWidth
            type="number"
            sx={{ marginTop: 2 }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={() => handlePrecioChange(producto.id)}
            sx={{ marginTop: 2 }}
          >
            Cambiar Precio
          </Button>
        </Paper>
      ))}
    </Box>
  );
}
