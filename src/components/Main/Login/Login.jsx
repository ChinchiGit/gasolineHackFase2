import React from "react";
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <>
      <section>
        <h1>GASOLINE HACK</h1>
      </section>
      <section>
        <button>LOGIN CON GOOGLE</button>
      </section>
      <section>
        <button><Link to ="/home">INVITADO</Link></button>
      </section>
    </>
  );
};

export default Login;
