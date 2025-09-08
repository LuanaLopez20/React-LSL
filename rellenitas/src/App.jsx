import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <h1>Las mejores galletitas.</h1>
        <ul>
          <li><a href="#home">Página principal</a></li>
          <li><a href="#rellentas">Rellenitas</a></li>
          <li><a href="#mas">Más</a></li>
        </ul>
      </nav>

      {/* Hero */}
      <header className="hero" id="home">
        <img src={"/cookie1.png"} />
        <h2>Rellen¡tas</h2>
      </header>

      {/* Sección ¿Qué es? */}
      <section className="section" id="rellentas">
        <div className="text-img">
          <img src={"/cookie2.png"} />
          <div className="text">
            <h3>¿Qué es Rellen¡tas?</h3>
            <p>
              <strong>Rellen¡tas</strong> es un emprendimiento que nació en abril de 2025, creado por una estudiante de 17 años con <strong>un gran sueño</strong>: viajar a Bariloche junto a sus compañeros.
            </p>
            <p>
              Con mucho esfuerzo, dedicación y una gran pasión por lo dulce, comenzó a preparar galletitas rellenas desde su casa, de a poco y con <strong>mucho amor</strong>.
            </p>
            <p>
              Hoy, <strong>Rellen¡tas</strong> sigue creciendo gracias al apoyo de cada persona que nos elige.
            </p>
          </div>
        </div>
      </section>

      {/* Sección sabores */}
      <section className="section">
        <div className="text-img reverse">
          <img src={"/cookie3.jpg"}/>
          <div className="text">
            <h3>Un poco de Rellen¡tas</h3>
            <p>
              En <strong>Rellen¡tas</strong> elaboramos galletas caseras con ingredientes de primera calidad, pensadas para que cada cliente las disfrute.
            </p>
            <p>Contamos con una gran variedad de sabores:</p>
            <ul>
              <li>
                <strong>Galletitas rellenas:</strong> con Nutella, pasta de maní, mermelada o crema de Oreo.
              </li>
              <li>
                <strong>Galletitas sin relleno:</strong> vainilla, chocolate, frutas, Oreo o avena.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>📍 Ubicación</p>
        <div className="socials">
          <a href="#">Instagram</a>
          <a href="#">Facebook</a>
          <a href="#">WhatsApp</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
