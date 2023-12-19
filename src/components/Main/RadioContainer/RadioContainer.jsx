import React, { useState, useEffect, useContext } from "react";
import RadioForm from "./RadioForm/RadioForm";
import RadioList from "./RadioList/RadioList"
import { GasolinerasListContext } from "../../../context/GasolinerasListContext";
import Map1radio from "./RadioList/Map1radio/Map1radio";
import "./RadioContainer.css"

const RadioContainer = () => {
  // RECOGE DE CONTEXTO EL LISTADO TOTAL DEPURADO
  const { gasolinerasList } = useContext(GasolinerasListContext);
  //RECOGE DEL FORMULARIO EL RADIO DE BUSQEDA Y TIPO DE COMBUSTIBLE
  const [eleccionUsuario, setEleccionUsuario] = useState("");
  //ESTADO TRAS ACOTAR EL LISTADO OBTENIDO DE CONTEXTO AL RADIO ELEGIDO.SE ENVIA POR PROPS A RadioList Y SE PINTA.  
  const [listadoRadio, setlistadoRadio] = useState([]);

  //CUANDO EL USUARIO YA HA ELEGIDO RADIO DE BUSQUEDA Y COMBUSTIBLE SE LANZAN LAS FUNCIONES PARA ACOTAR --> [eleccionUsuario]
  useEffect(() => {
    let gasolinerasRadio = [];
    function acotarRadio() {
      for (let i = 0; i < gasolinerasList.length; i++) {
        if (gasolinerasList[i].distancia <= eleccionUsuario.radio) {
          gasolinerasRadio.push(gasolinerasList[i])
        }
      }
    };

    function ordenarPorPrecio(listado) {
      listado.sort(function (a, b) {
        if (a[`${eleccionUsuario.combustible}`] > b[`${eleccionUsuario.combustible}`]) {
          return 1;
        }
        if (a[`${eleccionUsuario.combustible}`] < b[`${eleccionUsuario.combustible}`]) {
          return -1;
        }

        return 0;
      });
    };



    acotarRadio();
    ordenarPorPrecio(gasolinerasRadio)
    setlistadoRadio([...gasolinerasRadio]);

  }, [eleccionUsuario]);

  return (
    <>
      <section id="radioForm">
      <RadioForm setEleccionUsuario={setEleccionUsuario} />
      </section>
      {eleccionUsuario &&
      <>
        <section>
        <RadioList data={listadoRadio} eleccion={eleccionUsuario} />
        </section>
        <section>
        <Map1radio data={listadoRadio}/>
        </section>
      </>
      }
    </>
  )
};

export default RadioContainer;
