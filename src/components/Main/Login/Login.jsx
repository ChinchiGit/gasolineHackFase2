import React from 'react';
import { useEffect } from "react";
import {UserAuth} from "../../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import { Link } from 'react-router-dom';

const Login = () =>  {
  const navigate = useNavigate();
  const {user,googleSignIn} = UserAuth();
  const iniciarSesion=async()=>{
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
if(user!=null){
  navigate("/")
}
  },[user])
  return (
    <>
      <section className="imgseccion">
        <h1>GASOLINE HACK</h1>
        <div className="fondocontent">
       
        </div>
        <h4>Ahorrar al repostar</h4>
      </section>
      <section className="panelsesion">
        <h2>Iniciar sesión</h2>

        <button onClick={iniciarSesion}   className="btniniciar">
          
          <span> Iniciar con Gmail</span>
        </button>

        <button><Link  to='/home'>Entrar como invitado</Link></button>
      </section>
    </>
  );
}

export default Login;