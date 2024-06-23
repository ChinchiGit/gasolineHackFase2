import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import "./Home.css"


const Home = () => {

  return (
    <>
      <section id="homeContainer">
        <p className="texto">Las diferencias de precio entre estaciones de servicio pueden llegar a ser de hasta 20 céntimos de euro por litro. El depósito de un utilitario tiene capacidad para unos 50 litros de combustible. Por lo tanto, el ahorro buscando las gasolineras con mejores precios puede ser de unos 10 € por depósito. </p>

        <p className="texto">Te ofrecemos varias opciones de búsqueda para encontrar las más económicas.</p>
        <Link to="/cercana"><button>MAS CERCANA</button></Link>

        <Link to="/provincia"><button>PROVINCIA</button></Link>

        <Link to="/radio"><button>RADIO</button></Link>
      </section>
    </>
  );
};

export default Home;
