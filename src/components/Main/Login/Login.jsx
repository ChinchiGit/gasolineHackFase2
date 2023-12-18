import React from 'react';
import { useEffect } from "react";
import { UserAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { user, googleSignIn } = UserAuth();
  const iniciarSesion = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const addUser = async () => {
      const email = user.email;
      const name = user.displayName;
      const endpoint = "http://localhost:3000/usuarios/create";

      try {
        const response = await axios.post(endpoint, {
          email: email,
          name: name
        });

        alert('Usuario registrado con éxito', response.data);
      } catch (error) {
        console.error('El usuario ya figura en la Base de Datos:', error.message);
      }
    };

    addUser();

    if (user !== null) {
      navigate("/");
    }
  }, [user])

  return (
    <>
      <section className="imgseccion">
        <h1>GASOLINE HACK</h1>
        <div className="fondocontent">

        </div>
        <h4>Ahorrar al repostar</h4>
      </section>
      <section className="panelsesion">
        {user &&
        <>
          <img src={user.photoURL} alt="foto Usuario" />
          <h3>Bienvenido {user.displayName}</h3>
          <button><Link to='/home'>Buscar Gasolineras</Link></button>
        </>
        
        }

        {!user &&
          <>
            <h2>Iniciar sesión</h2>

            <button onClick={iniciarSesion} className="btniniciar">

              <span> Iniciar con Gmail</span>
            </button>

            <button><Link to='/home'>Entrar como invitado</Link></button>
          </>
        }
      </section>
    </>
  );
}

export default Login;