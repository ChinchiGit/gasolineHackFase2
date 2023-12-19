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
              <td className="tDetailsblue">Dirección:</td>
              <td>{gasolinerasList[0].Dirección}</td>
            </tr>
            <tr>
              <td className="tDetailsblue">Marca:</td>
              <td>{gasolinerasList[0].Rótulo}</td>
            </tr>
            <tr >
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
              <td>{gasolinerasList[1].distancia} Km</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section>
        <Mapas />
      </section>
    </>
  );
};

export default Cercana;
