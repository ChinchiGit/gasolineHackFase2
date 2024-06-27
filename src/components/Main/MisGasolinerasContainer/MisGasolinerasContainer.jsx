import React, { useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { GasolinerasListContext } from "../../../context/GasolinerasListContext";
import { UserAuth } from "../../../context/AuthContext";
import HistoricoPrecios from "./HistoricoPrecios/HistoricoPrecios"
import SpinnerMG from "./SpinnerMG/SpinnerMG";
import { set } from "firebase/database";

const MisGasolinerasContainer = () => {
  const { user } = UserAuth();
  const { gasolinerasList } = useContext(GasolinerasListContext);
  const [misGasolineras, setMisGasolineras] = useState([]);
  const [datosApiMG, setDatosApiMG] = useState([]);
  const [nuevoPrecio, setNuevoPrecio] = useState(false);


  // FETCH A LA BASE DE DATOS SQL PARA OBTENER GASOLINERAS DE USUARIO REGISTRADO CON SU MAIL
  useEffect(() => {
    let gasolinerasUser;
    async function fetchData() {
      const email = user.email;
      const endpoint = `https://gasolinehack-back.onrender.com/usuarios/all-user-gasstation?email=${email}`;


      try {
        const response = await axios.get(endpoint);
  
        gasolinerasUser = response.data[0].Gasolineras;

        setMisGasolineras([...gasolinerasUser])

      } catch (error) {
        console.error('Error al realizar la solicitud:', error.message);
      }
    }

    fetchData();
  }, []);

  // OBTENIDAS DE LA BBDD LAS ID DE LAS GASOLINERAS FAVORITAS, RECUPERAMOS SUS DATOS DEL ARRAY QUE TENEMOS EN CONTEXTO CON LOS DATOS DE LA API DEPURADOS
  useEffect(() => {
    let getDataApi = [];
    for (let i = 0; i < misGasolineras.length; i++) {

      getDataApi = [...getDataApi, (gasolinerasList.find(
        (gasolinera) => gasolinera.IDEESS == misGasolineras[i].idEnApi
      ))]
    }
    setDatosApiMG([...getDataApi])
    
  }, [misGasolineras]);

  //FUNCION PARA ELIMINAR GASOLINERA DE MIS FAVORITAS:
  const deleteGasolinera = async (i) => {
    const idGasolinera = misGasolineras[i].idGasolinera;
    const endpoint = "https://gasolinehack-back.onrender.com/gasolineras/delete-one";
    alert('¿Estás seguro de que quieres eliminar esta gasolinera de tus favoritas?');
    try {
      const response = await axios.delete(endpoint, {
          idGasolinera: idGasolinera
      });
      alert('Gasolinera eliminada de tus favoritas', response.data);
      misGasolineras.splice(i, 1);
    } catch (error) {
      console.error('Se produjo un error:', error.message);
    }
  };

  //FUNCION PARA GUARDAR PRECIO DEL DIA EN LA BB.DD.
  
  const addPrecio = async (guardarPrecio, i) => {
      const fecha = new Date();
      const idGasolinera = misGasolineras[i].idGasolinera;
      const precioGasolina = guardarPrecio["Precio Gasolina 95 E5"];
      const precioDiesel= guardarPrecio["Precio Gasoleo A"];
  
      const endpoint = "https://gasolinehack-back.onrender.com/precios/create";
  
      try {
        const response = await axios.post(endpoint, {
          fecha : fecha,
          idGasolinera : idGasolinera,
          precioGasolina : precioGasolina,
          precioDiesel: precioDiesel
  
        });
  
        alert('Añadido el precio de hoy a tu histórico de precios', response.data);
        setNuevoPrecio((prev) => !prev);
      } catch (error) {
        console.error('Se produjo un error:', error.message);
      }
    };
  


  //PREPARAR LA RUTA PARA IR A LA VISTA DETALLES
  const ruta = (id)=>{
    return `/detalles/:${id}`
  }

  const paintMisGasolineras = () => {
    if (datosApiMG.length > 0) {
      
      return datosApiMG.map((element, i) => (
        
        <>
          <section>

            <table >
              <tbody>
                <tr>
                  <td className="tDetailsblue">Dirección:</td>
                  <td>{element.Dirección} <span onClick={() => deleteGasolinera(i)}> 🗑️ </span></td>
                </tr>
                <tr>
                  <td className="tDetailsblue">Localidad:</td>
                  <td>{element.Localidad}</td>
                </tr>
                <tr>
                  <td className="tDetailsblue">Precio gasolina hoy:</td>
                  <td>{element["Precio Gasolina 95 E5"]} €</td>
                </tr>
                <tr>
                  <td className="tDetailsblue">Precio diesel hoy:</td>
                  <td>{element["Precio Gasoleo A"]} €</td>
                </tr>
              </tbody>
            </table>

              <button><Link  to={ruta(element.IDEESS)}>DETALLES</Link></button>
              <button onClick={() => addPrecio(element, i)}>GUARDAR PRECIO</button>

            <article className="contenedorGrafica">
              <HistoricoPrecios idGasolinera={misGasolineras[i].idGasolinera} nuevoPrecio ={nuevoPrecio}/>
            </article>
          </section>

        </>
      ));
    } else {
      return (
        <SpinnerMG/>
      )

    }

  };

  return (
    <>
        {paintMisGasolineras()}
    </>
  );

}
export default MisGasolinerasContainer;
