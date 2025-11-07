import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Button, TextField } from "@mui/material";

export default function Inventario({ productosIniciales, volverAlMenu }) {
  const [productos, setProductos] = useState([]);
  const [action, setAction] = useState(null);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: "",
    foto: "",
  });

  // Cargar productos iniciales (los del pedido)
  useEffect(() => {
    setProductos(productosIniciales || []);
  }, [productosIniciales]);

  // Agregar producto nuevo
  const handleAgregarProducto = () => {
    if (nuevoProducto.nombre && nuevoProducto.precio && nuevoProducto.foto) {
      const nuevoId = productos.length + 1;
      const productoNuevo = { ...nuevoProducto, id: nuevoId };
      setProductos([...productos, productoNuevo]);
      setNuevoProducto({ nombre: "", precio: "", foto: "" });
      setAction(null);
    } else {
      alert("Completa todos los campos");
    }
  };

  // Eliminar producto existente
  const handleEliminarProducto = (id) => {
    setProductos(productos.filter((p) => p.id !== id));
  };

  return (
    <Box>
      <Typography variant="h6">Modificar Inventario</Typography>

      {action === null && (
        <Box sx={{ marginTop: 2 }}>
          <Button
            variant="contained"
            onClick={() => setAction("agregar")}
            sx={{ marginRight: 2 }}
          >
            Agregar Producto
          </Button>
          <Button
            variant="outlined"
            onClick={() => setAction("eliminar")}
            sx={{ marginRight: 2 }}
          >
            Eliminar Producto
          </Button>
          <Button variant="outlined" onClick={volverAlMenu}>
            Volver al menú
          </Button>
        </Box>
      )}

      {action === "agregar" && (
        <Paper sx={{ padding: 2, marginTop: 2 }}>
          <Typography>Agregar Producto</Typography>
          <TextField
            label="Nombre"
            value={nuevoProducto.nombre}
            onChange={(e) =>
              setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })
            }
            fullWidth
            sx={{ marginTop: 2 }}
          />
          <TextField
            label="Precio"
            type="number"
            value={nuevoProducto.precio}
            onChange={(e) =>
              setNuevoProducto({ ...nuevoProducto, precio: e.target.value })
            }
            fullWidth
            sx={{ marginTop: 2 }}
          />
          <TextField
            label="URL Foto"
            value={nuevoProducto.foto}
            onChange={(e) =>
              setNuevoProducto({ ...nuevoProducto, foto: e.target.value })
            }
            fullWidth
            sx={{ marginTop: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleAgregarProducto}
            sx={{ marginTop: 2 }}
          >
            Agregar
          </Button>
          <Button
            variant="outlined"
            onClick={() => setAction(null)}
            sx={{ marginTop: 2, marginLeft: 2 }}
          >
            Volver
          </Button>
        </Paper>
      )}

      {action === "eliminar" && (
        <Paper sx={{ padding: 2, marginTop: 2 }}>
          <Typography>Eliminar Producto</Typography>
          {productos.length === 0 && (
            <Typography>No hay productos para eliminar</Typography>
          )}
          {productos.map((p) => (
            <Box
              key={p.id}
              sx={{
                marginTop: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography>
                {p.nombre} - ${p.precio}
              </Typography>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleEliminarProducto(p.id)}
              >
                Eliminar
              </Button>
            </Box>
          ))}
          <Button
            variant="outlined"
            onClick={() => setAction(null)}
            sx={{ marginTop: 2 }}
          >
            Volver
          </Button>
        </Paper>
      )}

      {action === null && productos.length > 0 && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6">Productos actuales</Typography>
          {productos.map((p) => (
            <Paper
              key={p.id}
              sx={{
                padding: 2,
                marginTop: 1,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography>
                {p.nombre} - ${p.precio}
              </Typography>
              {p.foto && <img src={p.foto} alt={p.nombre} width={50} />}
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
}
