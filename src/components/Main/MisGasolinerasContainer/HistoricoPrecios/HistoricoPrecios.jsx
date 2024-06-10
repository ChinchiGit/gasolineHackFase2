import React, {useEffect, useState} from "react";
import axios from "axios";
import {Grafica} from "./Grafica/Grafica"

const HistoricoPrecios = ({idGasolinera}) => {
  console.log(idGasolinera)
  const[preciosGasolinera, setpreciosGasolinera] = useState([])

  //LLAMADA A LA BB. DD. PARA TRAER LOS PRECIOS GUARDADOS POR EL USUARIO.
  useEffect(() => {
    let preciosUser;
    async function getPreciosGasolinera() {
      const endpoint = `https://gasolinehack-back.onrender.com/gasolineras/all-gasstation-prices?idGasolinera=${idGasolinera}`;


      try {
        const response = await axios.get(endpoint);
        
        preciosUser = response.data[0].Precios;
        

        setpreciosGasolinera([...preciosUser])
        

      } catch (error) {
        console.error('Error al realizar la solicitud:', error.message);
      }
    }

    getPreciosGasolinera();
  }, []);



  //variables para asar por props a la grafica
  const fechas =[];
  const preciosDiesel=[];
  const preciosGasolina=[];

  for (let i=0; i<preciosGasolinera.length; i++){
    fechas.push(preciosGasolinera[i].fecha);
    preciosDiesel.push(preciosGasolinera[i].precioDiesel);
    preciosGasolina.push(preciosGasolinera[i].precioGasolina);
  }
  
  for(let i=0; i<fechas.length; i++){
    fechas[i] = fechas[i].slice(0,10);
    console.log(fechas[i])
  }
 

  return (
    <Grafica fechas={fechas} preciosDiesel={preciosDiesel} preciosGasolina={preciosGasolina}/>

  );
};

export default HistoricoPrecios;
