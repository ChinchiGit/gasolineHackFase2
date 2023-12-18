import React, { useContext,useEffect, useState } from "react";
import MapasDetails from "./MapasDetails/MapasDetails";
import { GasolinerasListContext } from "../../../context/GasolinerasListContext";
import "./DetailsContainer.css"

const DetailsContainer = () => {
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


  return (
    <>
      <section>
        <table className="gas-station-card">
          <tbody>
            <tr>
              <th>Dirección:</th>
              <td>{gasolineraDetails.Dirección}</td>
            </tr>
            <tr>
              <th>Marca:</th>
              <td>{gasolineraDetails.Rótulo}</td>
            </tr>
            <tr>
              <th>Localidad:</th>
              <td>{gasolineraDetails.Localidad}</td>
            </tr>
            <tr>
              <th>Provincia:</th>
              <td>{gasolineraDetails.Provincia}</td>
            </tr>
            <tr>
              <th>Precio gasolina:</th>
              <td>{gasolineraDetails["Precio Gasolina 95 E5"]} €</td>
            </tr>
            <tr>
              <th>Precio diesel:</th>
              <td>{gasolineraDetails["Precio Gasoleo A"]} €</td>
            </tr>
            <tr>
              <th>Horario:</th>
              <td>{gasolineraDetails.Horario}</td>
            </tr>
            <tr>
              <th>Distancia:</th>
              <td>{gasolineraDetails.distancia} Km</td>
            </tr>
          </tbody>
        </table>
      </section>
      <MapasDetails/>

    </>
  );
};

export default DetailsContainer;
