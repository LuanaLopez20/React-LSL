import { useParams, Link } from "react-router-dom";
import "./descripciones.css";
import cookiesData from "./dataCookie";

export default function DescripcionK() {
  const { id } = useParams(); // obtenemos el id de la URL
  const cookie = cookiesData.find((c) => c.id === id);

  if (!cookie) {
    return <h2>No se encontró la cookie</h2>;
  }

  // 🔹 Convertimos la descripción en lista (cada línea = un <li>)
  const sabores = cookie.descripcion.split("\n");

  return (
    <div className="descripciones-container">
      <h2 className="titulo">{cookie.nombre}</h2>
      <div className="descripciones-grid">
        <div className="descripcion-card">
          <img src={cookie.imagen} alt={cookie.nombre} width="200px" />
          <div className="descripcion-texto">
            <h3>Tenemos diferentes opciones:</h3>
            <ul className="lista-sabores">
              {sabores.map((sabor, i) => (
                <li key={i}>{sabor}</li>
              ))}
            </ul>
            <Link to="/rellenitas">
              <button className="btn-volver">Volver a nuestras cookies</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
