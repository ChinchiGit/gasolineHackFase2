import React, { useEffect } from "react";
import { UserAuth } from "../../../context/AuthContext";
import { Link } from 'react-router-dom';

const LogOut = () => {
  const {user, logOut} = UserAuth();


  //AL CARGAR SE EJECUTA LA FUNCION DE LOG OUT -->[]
  useEffect(() => {
    const cerrarSesion=async()=>{
      try {
        await logOut();
      } catch (error) {
        console.log(error);
      }
    };
    cerrarSesion();    
  }, []);

  return(
    <section>
      <h2>¡Hasta Pronto!</h2>
      <p>Nos ha encantado verte por aquí. Ojalá te hayamos ayudado a <b>AHORRAR AL REPOSTAR</b> </p>
      <button><Link  to='/'>INICIO</Link></button>
    </section>
  );
};

export default LogOut;
