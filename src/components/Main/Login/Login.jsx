import React from 'react';
import { useEffect } from "react";
import {UserAuth} from "../../../context/AuthContext";
import {useNavigate} from "react-router-dom";

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
        <h1>useContext REACT es cool</h1>
        <div className="fondocontent">
       
        </div>
        <h4>Hola soy el login</h4>
      </section>
      <section className="panelsesion">
        <h2>Iniciar sesión</h2>

        <button onClick={iniciarSesion}   className="btniniciar">
          
          <span> Iniciar con Gmail</span>
        </button>
      </section>
    </>
  );
}

export default Login;