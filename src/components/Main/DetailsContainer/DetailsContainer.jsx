import React, { useContext,useEffect, useState } from "react";
import MapasDetails from "./MapasDetails/MapasDetails";
import axios from "axios";
import { GasolinerasListContext } from "../../../context/GasolinerasListContext";
import { UserAuth } from "../../../context/AuthContext";
import "./DetailsContainer.css"

const DetailsContainer = () => {
  const {user} = UserAuth();
  const { gasolinerasList } = useContext(GasolinerasListContext);
  const [gasolineraDetails, setGasolineraDetails]=useState("");
  
  useEffect(() => {
    //OBTENER LA ID QUE LLEGA POR QUERY
    const id = location.pathname.split(":").pop();
  
    //OBTERNER LA GASOLINERA QUE CORRESPONDE A ESA ID
    const gasolineraQuery = gasolinerasList.find(
      (gasolinera) => gasolinera.IDEESS == id 
    );
  
    setGasolineraDetails(gasolineraQuery);
  }, []); 

  //FUNCION PARA AÑADIR A "MIS GASOLINERAS" SI HAY USUARIO LOGUEADO.
  const addGasolinera = async ()=> {
    const email = user.email;
    const idEnApi = location.pathname.split(":").pop();
    const endpoint = "http://localhost:3000/gasolineras/create"

    try {
      const response = await axios.post(endpoint, {
        email: email,
        idEnApi: idEnApi
      });
  
      alert('Gasolinera añadida a MIS GASOLINERAS con éxito', response.data);

    } catch (error) {
      console.error('Error al realizar la solicitud:', error.message);
    }
  }

  return (
    <>
      <section>
        
        <table >
          <tbody>
            <tr>
              <td className="tDetailsblue">Dirección:</td>
              <td>{gasolineraDetails.Dirección}</td>
            </tr>
            <tr>
              <td className="tDetailsblue">Marca:</td>
              <td>{gasolineraDetails.Rótulo}</td>
            </tr>
            <tr>
              <td className="tDetailsblue">Localidad:</td>
              <td>{gasolineraDetails.Localidad}</td>
            </tr>
            <tr>
              <td className="tDetailsblue">Provincia:</td>
              <td>{gasolineraDetails.Provincia}</td>
            </tr>
            <tr>
              <td className="tDetailsblue">Precio gasolina:</td>
              <td>{gasolineraDetails["Precio Gasolina 95 E5"]} €</td>
            </tr>
            <tr>
              <td className="tDetailsblue">Precio diesel:</td>
              <td>{gasolineraDetails["Precio Gasoleo A"]} €</td>
            </tr>
            <tr>
              <td className="tDetailsblue">Horario:</td>
              <td>{gasolineraDetails.Horario}</td>
            </tr>
            <tr>
              <td className="tDetailsblue">Distancia:</td>
              <td>{gasolineraDetails.distancia} Km</td>
            </tr>
          </tbody>
        </table>
        
        {user && <button onClick={addGasolinera}>AÑADIR A FAVORITAS</button>}
      </section>
      <section>
        <MapasDetails/>
      </section>

    </>
  );
};

export default DetailsContainer;
