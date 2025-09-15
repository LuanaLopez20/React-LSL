import React from "react";
import "./App.css";

function Home({ cart, setCart }) {
  const cookies = [
    { id: 1, name: "COOKIE DE CHOCOLATE", price: 150, img: "/cookie1.png" },
    { id: 2, name: "COOKIE OREO", price: 170, img: "/cookie2.png" },
    { id: 3, name: "COOKIE DE FRUTA", price: 160, img: "/cookie3.jpg" },
  ];

  const addToCart = (cookie) => {
    setCart([...cart, cookie]);
  };

  return (
    <div className="App">
      {/* Hero */}
      <header className="hero" id="home">
        <img src={"/cookie1.png"} alt="cookie" />
        <h2>Rellen¡tas</h2>
      </header>

      {/* Sección ¿Qué es? */}
      <section className="section" id="rellentas">
        <div className="text-img">
          <img src={"/cookie2.png"} alt="cookie2" />
          <div className="text">
            <h3>¿Qué es Rellen¡tas?</h3>
            <p>
              <strong>Rellen¡tas</strong> es un emprendimiento que nació en
              abril de 2025, creado por una estudiante de 17 años con{" "}
              <strong>un gran sueño</strong>: viajar a Bariloche junto a sus
              compañeros.
            </p>
            <p>
              Con mucho esfuerzo, dedicación y una gran pasión por lo dulce,
              comenzó a preparar galletitas rellenas desde su casa, de a poco y
              con <strong>mucho amor</strong>.
            </p>
            <p>
              Hoy, <strong>Rellen¡tas</strong> sigue creciendo gracias al apoyo
              de cada persona que nos elige.
            </p>
          </div>
        </div>
      </section>

      {/* Sección sabores */}
      <section className="section">
        <div className="text-img reverse">
          <img src={"/cookie3.jpg"} alt="cookie3" />
          <div className="text">
            <h3>Un poco de Rellen¡tas</h3>
            <p>
              En <strong>Rellen¡tas</strong> elaboramos galletas caseras con
              ingredientes de primera calidad, pensadas para que cada cliente
              las disfrute.
            </p>
            <p>Contamos con una gran variedad de sabores:</p>
            <ul>
              <li>
                <strong>Galletitas rellenas:</strong> con Nutella, pasta de
                maní, mermelada o crema de Oreo.
              </li>
              <li>
                <strong>Galletitas sin relleno:</strong> vainilla, chocolate,
                frutas, Oreo o avena.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="socials">
          <a href="https://www.instagram.com/rellenitassok/?igsh=MWdjZmdyY2xuaXdyNA%3D%3D">
            Instagram
          </a>
          <a href="https://www.facebook.com/profile.php?id=61575698072985&rdid=FmGvhEm6rzaeR7qh&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F19RvkU5jwp%2F">
            Facebook
          </a>
          <a href="https://www.whatsapp.com/download">WhatsApp</a>
        </div>
      </footer>
    </div>
  );
}

export default Home;
