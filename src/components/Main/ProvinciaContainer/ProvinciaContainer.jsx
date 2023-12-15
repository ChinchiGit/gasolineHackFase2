import React, { useState, useEffect, useContext } from "react";
import ProvinciaForm from "./ProvinciaForm/ProvinciaForm";
import ProvinciaList from "./ProvinciaList/ProvinciaList"
import { GasolinerasListContext } from "../../../context/GasolinerasListContext";
import Map1provincia from "./ProvinciaList/Map1Provincia/Map1provincia";

const ProvinciaContainer = () => {
  //RECOGE DE CONTEXTO EL CONJUNTO DE GASOLINERAS
  const { gasolinerasList } = useContext(GasolinerasListContext);
  //ESTADO QUE RECOGE DEL FORMULARIO LA PROVINCIA Y TIPO DE COMBUSTIBLE
  const [eleccionUsuario, setEleccionUsuario] = useState({});
  //ESTADO TRAS ACOTAR EL LISTADO OBTENIDO DE CONTEXTO A LA PROVINCIA DESIGNADA.SE MANDA POR PROPS A ProvinciaList Y SE PINTA.  
  const [listadoProvincia, setlistadoProvincia] = useState([]);

  //CUANDO EL USUARIO YA HA ELEGIDO ROVINCIA Y COMBUSTIBLE SE LANZAN LAS FUNCIONES PARA ACOTAR --> [eleccionUsuario]
  useEffect(() => {
    let gasolinerasProvincia = [];
    function acotarProvincia() {
      for (let i = 0; i < gasolinerasList.length; i++) {
        if (gasolinerasList[i].Provincia == `${eleccionUsuario.provinciaElegida}`) {

          gasolinerasProvincia.push(gasolinerasList[i]);

        }
      };
    };

    function ordenarPorPrecio(listado) {
      listado.sort(function (a, b) {
        if (a[`${eleccionUsuario.combustibleElegido}`] > b[`${eleccionUsuario.combustibleElegido}`]) {
          return 1;
        }
        if (a[`${eleccionUsuario.combustibleElegido}`] < b[`${eleccionUsuario.combustibleElegido}`]) {
          return -1;
        }
    
        return 0;
      });
    };

    acotarProvincia();
    ordenarPorPrecio(gasolinerasProvincia)
    setlistadoProvincia(gasolinerasProvincia);

  }, [eleccionUsuario]);

  return (
    <>
      <ProvinciaForm setEleccionUsuario={setEleccionUsuario} />
      <ProvinciaList data={listadoProvincia} eleccion={eleccionUsuario}/>
      <Map1provincia data={listadoProvincia}/>
    </>
  )
};

export default ProvinciaContainer;
