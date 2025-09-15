import React from "react";
import chocolate from "../assets/chocolate.jpeg";
import avena from "../assets/avena.jpeg";
import fruta from "../assets/fruta.jpeg";
import oreo from "../assets/oreo.jpeg";
import vainilla from "../assets/vainilla.jpeg";
import "../descripciones.css";

const cookies = [
  {
    nombre: "Cookie de Chocolate",
    descripcion: `Tenemos diferentes opciones:
    🍫 Cocoa Noir: Sin relleno
    🍩 Nutty Choc: Relleno de nutella
    🥜 Bonchoco: Relleno de pasta de maní
    🍓 Choco Burst: Relleno de mermelada
    🍪 Dream Cream: Relleno de crema oreo`,
    imagen: chocolate,
  },
  {
    nombre: "Cookie de Avena",
    descripcion: `Tenemos diferentes opciones:
    🌾 Oatmeal: Sin relleno
    🍫 Nutty Oat: Relleno de nutella
    🥜 Maven: Relleno de pasta de maní
    🍓 Love: Relleno de mermelada
    🍪 Creamy Harvest: Relleno de crema oreo`,
    imagen: avena,
  },
  {
    nombre: "Cookie de Fruta",
    descripcion: `Tenemos diferentes opciones:
    🍏 Fruitful: Sin relleno
    🍫 Nutty Fruit: Relleno de nutella
    🥜 Peanut: Relleno de pasta de maní
    🍓 Kiss: Relleno de mermelada
    🍪 FrutOr: Relleno de crema oreo`,
    imagen: fruta,
  },
  {
    nombre: "Cookie de Vainilla",
    descripcion: `Tenemos diferentes opciones:
    🍪 Chippy: Sin relleno
    🍫 Nutty: Relleno de nutella
    🥜 Bonbonita: Relleno de pasta de maní
    🍓 Sweet: Relleno de mermelada
    🥛 CreamOr: Relleno de crema de oreo`,
    imagen: vainilla,
  },
  {
    nombre: "Cookie de Oreo",
    descripcion: `Tenemos diferentes opciones:
    🍪 Oreo Bites: Sin relleno
    🍫 Nutty Or: Relleno de nutella
    🥜 CrunchPean: Relleno de pasta de maní
    🍓 TwistOr: Relleno de mermelada
    ❤️ Cookie Love: Relleno de crema oreo`,
    imagen: oreo,
  },
];

export default function Descripciones() {
  return (
    <div className="descripciones-container">
      <h1 className="titulo">📖 Nuestras Descripciones</h1>

      <div className="descripciones-grid">
        {cookies.map((cookie, index) => (
          <div key={index} className="descripcion-card">
            {/* Imagen izquierda */}
            <img src={cookie.imagen} alt={cookie.nombre} />

            {/* Texto derecha */}
            <div className="descripcion-texto">
              <h2>{cookie.nombre}</h2>
              <p>{cookie.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
