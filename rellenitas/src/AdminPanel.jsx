import React, { useState } from 'react';
import { Container, Box, Button, AppBar, Toolbar, Typography, Grid, Paper } from '@mui/material';
import Pedidos from './Pedidos'; // Componente para manejar los pedidos
import Inventario from './Inventario'; // Componente para manejar el inventario
import Precios from './Precios'; // Componente para ajustar los precios
import { useAuth } from './AuthContext'; // Para verificar que es admin

export default function AdminPanel() {
  const [selectedAction, setSelectedAction] = useState(null); // Estado para manejar la selección de acción
  const { logout, role } = useAuth(); // Obtener el rol del usuario

  // Cambia la acción seleccionada
  const handleActionSelect = (action) => {
    setSelectedAction(action);
  };

  // Verifica si el usuario es admin
  if (role !== 'admin') {
    return <h2>No autorizado. Debes ser administrador para acceder.</h2>;
  }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Panel de Administración
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ width: '100%', marginTop: 3 }}>
        {/* Mostrar las opciones de acción para el administrador */}
        {selectedAction === null ? (
          <>
            <Typography variant="h5">¿Qué deseas modificar?</Typography>
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item xs={4}>
                <Paper sx={{ padding: 2 }}>
                  <Button fullWidth onClick={() => handleActionSelect('pedidos')} variant="contained">
                    Modificar Pedidos
                  </Button>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper sx={{ padding: 2 }}>
                  <Button fullWidth onClick={() => handleActionSelect('inventario')} variant="contained">
                    Modificar Inventario
                  </Button>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper sx={{ padding: 2 }}>
                  <Button fullWidth onClick={() => handleActionSelect('precios')} variant="contained">
                    Modificar Precios
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            {/* Mostrar el componente correspondiente según la acción seleccionada */}
            {selectedAction === 'pedidos' && <Pedidos />}
            {selectedAction === 'inventario' && <Inventario />}
            {selectedAction === 'precios' && <Precios />}
          </>
        )}
      </Box>

      <Button onClick={logout} variant="outlined" color="secondary" sx={{ marginTop: 2 }}>
        Cerrar sesión
      </Button>
    </Container>
  );
}