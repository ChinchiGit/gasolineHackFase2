import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grafica } from "./Grafica/Grafica"

const HistoricoPrecios = ({ idGasolinera, nuevoPrecio }) => {
  console.log(idGasolinera)
  const [preciosGasolinera, setpreciosGasolinera] = useState([])

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
  }, [idGasolinera, nuevoPrecio]);



  //variables para pasar por props a la grafica
  const fechas = [];
  const preciosDiesel = [];
  const preciosGasolina = [];

  const uniqueFechas = new Set();
  for (let i = 0; i < preciosGasolinera.length; i++) {
    const date = new Date(preciosGasolinera[i].fecha);
    const formattedDate = date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });

    // Solo agregar si la fecha no está repetida
    if (!uniqueFechas.has(formattedDate)) {
      uniqueFechas.add(formattedDate);
      fechas.push(formattedDate);
      preciosDiesel.push(preciosGasolinera[i].precioDiesel);
      preciosGasolina.push(preciosGasolinera[i].precioGasolina);
    }
  }

  return (
    <Grafica fechas={fechas} preciosDiesel={preciosDiesel} preciosGasolina={preciosGasolina} />

  );
};

export default HistoricoPrecios;
