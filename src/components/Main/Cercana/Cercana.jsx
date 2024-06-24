import React, { useContext } from "react";
import Mapas from "./MapasCercana/Mapas";
import { GasolinerasListContext } from "../../../context/GasolinerasListContext";
import { UserUbicationContext } from "../../../context/UserUbicationContext";
import LocationSpinner from "../../LocationSpinner/LocationSpinner";
import "./Cercana.css";

const Cercana = () => {
  const { ubicacionUsuario } = useContext(UserUbicationContext);
  const { status } = useContext(UserUbicationContext);
  const { gasolinerasList } = useContext(GasolinerasListContext);



  return (
    <>
      {!ubicacionUsuario || !ubicacionUsuario.latitud || !ubicacionUsuario.longitud ? (
        <LocationSpinner />
      ) : (
        <>
          <section>
            <h4>Tu gasoliera más cercana</h4>
            <table className="gas-station-card">
              <tbody>
                <tr>
                  <td className="tDetailsblue">Dirección:</td>
                  <td>{gasolinerasList[0].Dirección}</td>
                </tr>
                <tr>
                  <td className="tDetailsblue">Marca:</td>
                  <td>{gasolinerasList[0].Rótulo}</td>
                </tr>
                <tr>
                  <td className="tDetailsblue">Localidad:</td>
                  <td>{gasolinerasList[0].Localidad}</td>
                </tr>
                <tr>
                  <td className="tDetailsblue">Provincia:</td>
                  <td>{gasolinerasList[0].Provincia}</td>
                </tr>
                <tr>
                  <td className="tDetailsblue">Precio gasolina:</td>
                  <td>{gasolinerasList[0]["Precio Gasolina 95 E5"]} €</td>
                </tr>
                <tr>
                  <td className="tDetailsblue">Precio diesel:</td>
                  <td>{gasolinerasList[0]["Precio Gasoleo A"]} €</td>
                </tr>
                <tr>
                  <td className="tDetailsblue">Horario:</td>
                  <td>{gasolinerasList[0].Horario}</td>
                </tr>
                <tr>
                  <td className="tDetailsblue">Distancia:</td>
                  <td>{gasolinerasList[0].distancia} Km</td>
                </tr>
              </tbody>
            </table>
          </section>
          <section className="mapasSection">
            {status == true ?
              <Mapas /> : 
              <p>Espera un momento, por favor...</p>}
          </section>
        </>
      )}
    </>
  );
};

export default Cercana;
