import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Persona from "./components/persona";
import { Operator } from "./components/operator";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    //useEffect ejecuta el codigo una vez si no hay nada en los
    //corchetes, y si hay variables(dependencias)
    //se va a ejecutar tanto como actualice
  }, []);

  return (
    <>
      <Operator />
    </>
  );
}

export default App;

import { useState } from "react";

export function Operator() {
  const [nums, setNums] = useState([1, 2, 3, 4, 5]);
  const [persona, setPersona] = useState({
    name: "Federico",
    alumno: "Thiago",
  });

  //arrow function
  const addNums = () => {
    setNums([...nums, 6]);
  };

  const updateName = () => {
    setPersona({ ...persona, name: "Miguel", edad: 80 });
    console.log(persona);
  };

  return (
    <>
      {nums.map((num, index) => (
        <p key={index}>{num}</p>
      ))}
      <h3>Spread Operator</h3>
      <button onClick={addNums}>agregar numeros</button>
      <button onClick={updateName}>modificar persona</button>
    </>
  );
}
