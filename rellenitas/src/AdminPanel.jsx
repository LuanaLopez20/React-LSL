import React, { useState } from 'react';
import { Container, Box, Button, AppBar, Toolbar, Typography, Tab, Tabs, Grid, Paper } from '@mui/material';
import Pedidos from './Pedidos'; // Componente para manejar los pedidos
import Inventario from './Inventario'; // Componente para manejar el inventario
import Precios from './Precios'; // Componente para ajustar los precios
import { useAuth } from './AuthContext'; // Para verificar que es admin

export default function AdminPanel() {
  const [selectedTab, setSelectedTab] = useState(0);
  const { logout, role } = useAuth();

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

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
        <Tabs value={selectedTab} onChange={handleTabChange} aria-label="panel de administración">
          <Tab label="Pedidos" />
          <Tab label="Inventario" />
          <Tab label="Precios" />
        </Tabs>

        <Box sx={{ paddingTop: 2 }}>
          {selectedTab === 0 && <Pedidos />}
          {selectedTab === 1 && <Inventario />}
          {selectedTab === 2 && <Precios />}
        </Box>
      </Box>

      <Button onClick={logout} variant="outlined" color="secondary" sx={{ marginTop: 2 }}>
        Cerrar sesión
      </Button>
    </Container>
  );
}
