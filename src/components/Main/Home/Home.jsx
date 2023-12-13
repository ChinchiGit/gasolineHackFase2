import React from "react";
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <>
    <section>
      <button><Link to ="/cercana">MAS CERCANA</Link></button>
    </section>
    <section>
      <button><Link to ="/provincia">PROVINCIA</Link></button>
    </section>
    <section>
    <button><Link to ="/radio">RADIO</Link></button>
    </section>
    </>
  );
};

export default Home;
