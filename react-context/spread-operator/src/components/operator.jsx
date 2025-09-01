import React, { useState } from "react";

const productos = [
  { nombre: "Camiseta", precio: 20 },
  { nombre: "Pantalón", precio: 30 },
];

console.log(productos);

const productosConDescuento = productos.map((producto) => ({
  ...producto,
  descuento: true,
}));

console.log(productosConDescuento);

// Primer componente: NumerosConsecutivos
function NumerosConsecutivos() {
  const [numeros, setNumeros] = useState([]);

  const agregarConsecutivo = () => {
    const siguiente = numeros.length > 0 ? numeros[numeros.length - 1] + 1 : 1;
    setNumeros([...numeros, siguiente]);
  };

  return (
    <>
      <h2>Números: {numeros.join(", ")}</h2>
      <button onClick={agregarConsecutivo}>Agregar número</button>
    </>
  );
}

// Segundo componente: Operator
function Operator() {
  const [persona, setPersona] = useState({
    name: "Federico",
    alumno: "Thiago",
  });

  const updateName = () => {
    setPersona({ ...persona, name: "Miguel", edad: 80 });
    console.log(persona);
  };

  return (
    <>
      <h3>Spread Operator</h3>
      <button onClick={updateName}>Modificar persona</button>
    </>
  );
}

// Componente principal que usa ambos
function Test() {
  return (
    <div>
      <NumerosConsecutivos />
      <Operator />
    </div>
  );
}

// Exportar el componente principal
export default Test;
