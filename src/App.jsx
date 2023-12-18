import { useState, useEffect, useContext } from 'react';
import { GasolinerasListContext } from './context/GasolinerasListContext';
import { UserUbicationContext } from "./context/UserUbicationContext"
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider, UserAuth } from "./context/AuthContext";
import Header from "./components/Header";
import Main from "./components/Main";
import axios from 'axios';
import "./App.css"


function App() {
  //ESTADO PARA ALMACENAR UBICACION DEL USUARIO.  SE COMPARTE POR CONTEXTO.
  const [ubicacionUsuario, setUbicacionUsuario] = useState()

  //ESTADO PARA ALMACENAR OBJETO PROVENIENTE DE FETCH
  const [gasolinerasBruto, setGasolinerasBruto] = useState([]);

  //ESTADO PARA ALMACENAR OBJETO DEPURADO. SE COMPARTE POR CONTEXTO.
  const [gasolinerasList, setGasolinerasList] = useState("");


  //PEDIR LA UBICACION DEL USUARIO UNA VEZ AL ARRANCAR LA APLICACION -->[]
  useEffect(() => {
    //OBTENER UBICACION DEL NAVEGADOR 
    const obtenerUbicacion = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUbicacionUsuario({ latitud: latitude, longitud: longitude });
        },
        (error) => {
          console.error('Error al obtener la ubicación:', error.message);
        }
      );
    };

    // POR SI EL NAVEGADOR NO PERMITE GEOLOCALIZAR
    if ('geolocation' in navigator) {
      obtenerUbicacion();
    } else {
      console.error('Geolocalización no soportada por este navegador');
    }
  }, []);


  //FETCH A LA API CUANDO CONOCEMOS LA UBICACION DEL USUARIO -->[ubicacionUsuario]
  useEffect(() => {
    console.log(ubicacionUsuario)
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

  }, [ubicacionUsuario]);

  //DEPURADO DEL OBJETO. SE HACE CUANDO YA TENEMOS LOS DATOS PROVENIENTES DEL FETCH EN EL ESTADO --> [gasolinerasBruto]
  useEffect(() => {

    let gasolinerasDepurado1 = [];
    let gasolinerasDepurado2 = [];
    let distancia;

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
      setGasolinerasList([...gasolinerasDepurado2]);
    };

    //FUNCION HAVERSIN CALCULAR DISTANCIA (SE INVOCA DENTRO DE LA SIGUIENTE)
    function distanciaHaversine(latitud1, longitud1, latitud2, longitud2) {
      const R = 6371.01 // Radio de la Tierra en kilómetros
      const φ1 = latitud1 * Math.PI / 180
      const φ2 = latitud2 * Math.PI / 180
      const Δφ = (latitud2 - latitud1) * Math.PI / 180
      const Δλ = (longitud2 - longitud1) * Math.PI / 180

      const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      distancia = (R * c);
      return R * c;
    };

    //ORDENAR POR DISTANCIA AL USUARIO
    function getGasolineraMasCercana(listado) {
      for (let i = 0; i < listado.length; i++) {
        distanciaHaversine(ubicacionUsuario.latitud, ubicacionUsuario.longitud, listado[i].Latitud, listado[i]["Longitud (WGS84)"]);
        listado[i].distancia = distancia.toFixed(2);
      }

    }

    //ORDENAR POR DISTANCIA AL USUARIO
    function ordenarPorDistancia() {
      gasolinerasDepurado2.sort(function (a, b) {
        if (a["distancia"] > b["distancia"]) {
          return 1;
        }
        if (a["distancia"] < b["distancia"]) {
          return -1;
        }

        return 0;
      });
    };




    depurar1();
    depurar2();
    getGasolineraMasCercana(gasolinerasDepurado2);
    ordenarPorDistancia();
    setGasolinerasList(gasolinerasDepurado2);
    console.log(gasolinerasList);

  }, [gasolinerasBruto]);


  const gasolinerasListData = { gasolinerasList };
  const ubicacioUsuarioData = { ubicacionUsuario };


  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <Header />
          <GasolinerasListContext.Provider value={gasolinerasListData}>
            <UserUbicationContext.Provider value={ubicacioUsuarioData}>
              <Main />
            </UserUbicationContext.Provider>
          </GasolinerasListContext.Provider>
        </AuthContextProvider>
        {/* <Footer/> */}
      </BrowserRouter>
    </>
  )
}

export default App
