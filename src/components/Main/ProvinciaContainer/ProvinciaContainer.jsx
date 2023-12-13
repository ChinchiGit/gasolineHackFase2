import React, { useState, useEffect, useContext } from "react";
import ProvinciaForm from "./ProvinciaForm/ProvinciaForm";
import ProvinciaList from "./ProvinciaList/ProvinciaList"
import { GasolinerasListContext } from "../../../context/GasolinerasListContext";

const ProvinciaContainer = () => {

  const { gasolinerasList } = useContext(GasolinerasListContext);
  //ESTADO QUE RECOGE DEL FORMULARIO LA PROVINCIA Y TIPO DE COMBUSTIBLE
  const [eleccionUsuario, setEleccionUsuario] = useState({});
  //ESTADO TRAS ACOTAR EL LISTADO OBTENIDO DE CONTEXTO A LA PROVINCIA DESIGNADA.  
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
      <ProvinciaList data={listadoProvincia}/>
    </>
  )
};

export default ProvinciaContainer;
