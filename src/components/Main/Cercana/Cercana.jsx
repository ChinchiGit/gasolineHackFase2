import React, { useContext } from "react";
import Mapas from "./MapasCercana/Mapas";
import { GasolinerasListContext } from "../../../context/GasolinerasListContext";
import "./Cercana.css"

const Cercana = () => {
  const { gasolinerasList } = useContext(GasolinerasListContext);
  return (
    <>
      <section>
        <table className="gas-station-card">
          <tbody>
            <tr>
              <th>Dirección:</th>
              <td>{gasolinerasList[0].Dirección}</td>
            </tr>
            <tr>
              <th>Marca:</th>
              <td>{gasolinerasList[0].Rótulo}</td>
            </tr>
            <tr>
              <th>Localidad:</th>
              <td>{gasolinerasList[0].Localidad}</td>
            </tr>
            <tr>
              <th>Provincia:</th>
              <td>{gasolinerasList[0].Provincia}</td>
            </tr>
            <tr>
              <th>Precio gasolina:</th>
              <td>{gasolinerasList[0]["Precio Gasolina 95 E5"]} €</td>
            </tr>
            <tr>
              <th>Precio diesel:</th>
              <td>{gasolinerasList[0]["Precio Gasoleo A"]} €</td>
            </tr>
            <tr>
              <th>Horario:</th>
              <td>{gasolinerasList[0].Horario}</td>
            </tr>
            <tr>
              <th>Distancia:</th>
              <td>{gasolinerasList[1].distancia} Km</td>
            </tr>
          </tbody>
        </table>
      </section>

      <Mapas />
    </>
  );
};

export default Cercana;
