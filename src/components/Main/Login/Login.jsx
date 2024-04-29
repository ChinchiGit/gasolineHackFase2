import React, { useState } from 'react';
import { useEffect } from "react";
import { UserAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from "axios";
import SingUpForm from './SingUpForm/SingUpForm';
import "./Login.css"
import SingInForm from './SingInForm/SingInForm';

const Login = () => {
  const navigate = useNavigate();
  const { user, googleSignIn } = UserAuth();
  const [registrar, setRegistrar] = useState(false)

  //Mostrar SingUp y ocultar 
  const handleToggleRegistrar = () => {
    setRegistrar((prevRegistrar) => !prevRegistrar);
  };

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
      const endpoint = "https://gasolinehack-back.onrender.com/usuarios/create";

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
      <section >
        <img id="mainLogo" src="/assets/img/gasolinehack.png" alt="Logo gasoline Hack" />
        <h4 id="subtitulo">Ahorrar al repostar</h4>
      </section>
      <section className="panelsesion">
        {user &&
          <>
            <img id="fotoUser" src={user.photoURL} alt="foto Usuario" />
            <h3>Bienvenido {user.displayName}</h3>
            <Link to='/home'><button>Buscar Gasolineras</button></Link>
          </>

        }

        {!user &&
          <>

            {registrar == false ?
              <>
                <h2>Iniciar sesión</h2>
                <SingInForm />
                <p>¿No tienes cuenta? <b onClick={handleToggleRegistrar} style={{
                  cursor: 'pointer'
                }}>¡Regístrate!</b></p>
              </>
              :
              <>
                <h2>Registro</h2>
                <SingUpForm />
                <p>¡Ya estoy registrado! <b onClick={handleToggleRegistrar} style={{
                  cursor: 'pointer'
                }}>Volver</b></p>

              </>
            }


            <article>
              <button onClick={iniciarSesion} className="btniniciar">

                <span> Iniciar con Gmail</span>
              </button>

              <Link to='/home'><button>Entrar como invitado</button></Link>
            </article>
          </>
        }
      </section>
    </>
  );
}

export default Login;