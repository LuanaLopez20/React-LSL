import React, { useState } from "react";
import { Box, Paper, Typography, Button } from "@mui/material";

export default function Pedidos() {
  // Definir un estado para los pedidos
  const [pedidos, setPedidos] = useState([
    {
      id: 1234,
      producto: "Galletas de chocolate",
      cantidad: 2,
      estado: "Pendiente",
    },
    {
      id: 1235,
      producto: "Galletas de vainilla",
      cantidad: 3,
      estado: "Pendiente",
    },
  ]);

  // Función para marcar un pedido como "Enviado"
  const handleMarkAsShipped = (orderId) => {
    setPedidos((prevPedidos) =>
      prevPedidos.map((pedido) =>
        pedido.id === orderId ? { ...pedido, estado: "Enviado" } : pedido
      )
    );
  };

  return (
    <Box>
      <Typography variant="h6">Pedidos Recientes</Typography>
      {/* Mapeo de pedidos para mostrarlos dinámicamente */}
      {pedidos.map((pedido) => (
        <Paper key={pedido.id} elevation={3} sx={{ padding: 2, marginTop: 2 }}>
          <Typography>Pedido #{pedido.id}</Typography>
          <Typography>Producto: {pedido.producto}</Typography>
          <Typography>Cantidad: {pedido.cantidad}</Typography>
          <Typography>Estado: {pedido.estado}</Typography>

          {/* Mostrar el botón solo si el estado del pedido no es "Enviado" */}
          {pedido.estado !== "Enviado" && (
            <Button
              variant="contained"
              color="success"
              onClick={() => handleMarkAsShipped(pedido.id)}
            >
              Marcar como Enviado
            </Button>
          )}
        </Paper>
      ))}
    </Box>
  );
}
