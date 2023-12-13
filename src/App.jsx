import { useState, useEffect, useContext } from 'react'
import { GasolinerasListContext } from './context/GasolinerasListContext';

import Header from "./components/Header"
import Main from "./components/Main"
import axios from 'axios';




function App() {

  //ESTADO PARA ALMACENAR OBJETO PROVENIENTE DE FETCH
  const [gasolinerasBruto, setGasolinerasBruto] = useState([]);

  //ESTADO PARA ALMACENAR OBJETO DEPURADO. SE COMPARTE POR CONTEXTO.
  const [gasolinerasList, setGasolinerasList] = useState("")

  //FETCH A LA API 
  useEffect(() => {
    async function getAll() {
      try {
        const resHome = await axios.get("https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/")
        const jsonHome = await resHome.data.ListaEESSPrecio
        console.log(jsonHome);
        setGasolinerasBruto([...jsonHome])
        console.log(gasolinerasBruto);
      } catch (e) {
        console.error("Error en la petición de datos:", e)

      }
    };
    getAll();

  }, []);

  //DEPURADO DEL OBJETO. SE HACE CUANDO YA TENEMOS LOS DATOS PROVENIENTES DEL FETCH EN EL ESTADO --> [gasolinerasBruto]
  useEffect(() => {

    let gasolinerasDepurado1 = [];
    let gasolinerasDepurado2 = [];

    function depurar1() {
      for (let i = 0; i < gasolinerasBruto.length; i++) {
        if (gasolinerasBruto[i]["Tipo Venta"] == "P") {

          gasolinerasDepurado1.push(gasolinerasBruto[i]);
        }
      }
    };

    // DEPURACION 2 CONVERTIR LOS STRINGS DE PRECIOS Y GEOLOCALIZACION A NUMERO Y ELIMINAR LOS "NaN" 
    function depurar2() {
      for (let i = 0; i < gasolinerasDepurado1.length; i++) {
        gasolinerasDepurado1[i]["Precio Gasoleo A"] = gasolinerasDepurado1[i]["Precio Gasoleo A"].replace(",", ".");
        gasolinerasDepurado1[i]["Precio Gasoleo A"] = Number(gasolinerasDepurado1[i]["Precio Gasoleo A"]);
        gasolinerasDepurado1[i]["Precio Gasolina 95 E5"] = gasolinerasDepurado1[i]["Precio Gasolina 95 E5"].replace(",", ".");
        gasolinerasDepurado1[i]["Precio Gasolina 95 E5"] = Number(gasolinerasDepurado1[i]["Precio Gasolina 95 E5"]);
        gasolinerasDepurado1[i].Latitud = gasolinerasDepurado1[i].Latitud.replace(",", ".");
        gasolinerasDepurado1[i].Latitud = Number(gasolinerasDepurado1[i].Latitud);
        gasolinerasDepurado1[i]["Longitud (WGS84)"] = gasolinerasDepurado1[i]["Longitud (WGS84)"].replace(",", ".");
        gasolinerasDepurado1[i]["Longitud (WGS84)"] = Number(gasolinerasDepurado1[i]["Longitud (WGS84)"]);

        if (gasolinerasDepurado1[i]["Precio Gasolina 95 E5"] != 0 && gasolinerasDepurado1[i]["Precio Gasoleo A"] != 0) {
          gasolinerasDepurado2.push(gasolinerasDepurado1[i])
        }

      };
      setGasolinerasList(gasolinerasDepurado2);
    }


    depurar1();
    depurar2();
    // setGasolinerasList(gasolinerasDepurado2);
    console.log(gasolinerasList);

  }, [gasolinerasBruto]); 

  
  const gasolinerasListData = { gasolinerasList};


  return (
    <>
      {/* <BrowserRouter> */}
        <GasolinerasListContext.Provider value={gasolinerasListData}>  
          <Header/>
          <Main/>
        </GasolinerasListContext.Provider>
        {/* <Footer/> */}
      {/* </BrowserRouter> */}
    </>
  )
}

export default App
