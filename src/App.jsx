import { useState, useEffect, useContext } from 'react';
import { GasolinerasListContext } from './context/GasolinerasListContext';
import { UserUbicationContext } from "./context/UserUbicationContext"
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider, UserAuth } from "./context/AuthContext";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Spinner from './components/Spinner/Spinner';
import axios from 'axios';
import "./App.css"
import { set } from 'firebase/database';


function App() {
  //ESTADO PARA ALMACENAR UBICACION DEL USUARIO.  SE COMPARTE POR CONTEXTO.
  const [ubicacionUsuario, setUbicacionUsuario] = useState("");

  const [status, setStatus] = useState(false);

  //ESTADO PARA ALMACENAR OBJETO PROVENIENTE DE FETCH
  const [gasolinerasBruto, setGasolinerasBruto] = useState([]);

  //ESTADO PARA ALMACENAR OBJETO DEPURADO. SE COMPARTE POR CONTEXTO.
  const [gasolinerasList, setGasolinerasList] = useState("");


  //FETCH DE DATOS DE GASOLINERAS AL CARGAR LA PAGINA
  useEffect(() => {

    async function getAll() {
      try {
        const resHome = await axios.get("https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/")
        const jsonHome = await resHome.data.ListaEESSPrecio
        setGasolinerasBruto([...jsonHome])
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

    // DEPURACION 1 ELIMINAR LAS GASOLINERAS QUE NO TIENEN VENTA AL PUBLICO (COOPERATIVAS Y PRIVADAS)
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

    depurar1();
    depurar2();
    setGasolinerasList(gasolinerasDepurado2);
    console.log(gasolinerasList);

  }, [gasolinerasBruto]);

  //OBTENER UBICACION DEL USUARIO CUANDO LA LISTA DE GASOLINERAS ESTÁ DEPURADA
  useEffect(() => {
    const obtenerUbicacion = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUbicacionUsuario({ latitud: latitude, longitud: longitude });
            console.log('Ubicación obtenida:', latitude, longitude);
          },
          (error) => {
            console.error('Error al obtener la ubicación:', error.message);
            // Manejar el error, por ejemplo, estableciendo una ubicación predeterminada
            // setUbicacionUsuario({ latitud: "", longitud: "" }); // Ubicación de Madrid como ejemplo
          }
        );
      } else {
        console.error('Geolocalización no soportada por este navegador');
        // Establecer una ubicación predeterminada si la geolocalización no está disponible
        //setUbicacionUsuario({ latitud: 40.416775, longitud: -3.703790 }); // Ubicación de Madrid como ejemplo
      }
    };

    obtenerUbicacion();
  }, [gasolinerasBruto]);

  //ORDENAR LAS GASOLINERAS POR DISTANCIA AL USUARIO CUANDO SE CONOCE SU UBICACIÓN
  useEffect(() => {
    if (ubicacionUsuario !== "") {
      console.log(ubicacionUsuario);
      console.log("Me estoy ejecutando")
      let listadoConDistancia = [...gasolinerasList];
      let distancia;

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

      //INTRODUCIR LA DISTANCIA AL USUARIO EN EL LISTADO DE GASOLINERAS
      function introducirDistancia(listado) {
        for (let i = 0; i < listado.length; i++) {
          distanciaHaversine(ubicacionUsuario.latitud, ubicacionUsuario.longitud, listado[i].Latitud, listado[i]["Longitud (WGS84)"]);
          listado[i].distancia = distancia.toFixed(2);
        }

      }

      //ORDENAR POR DISTANCIA AL USUARIO
      function ordenarPorDistancia() {
        listadoConDistancia.sort(function (a, b) {
          if (a["distancia"] > b["distancia"]) {
            return 1;
          }
          if (a["distancia"] < b["distancia"]) {
            return -1;
          }

          return 0;
        });
      };

      introducirDistancia(listadoConDistancia);
      ordenarPorDistancia();
      setGasolinerasList([...listadoConDistancia]);
      setStatus(true);
    }
  }, [ubicacionUsuario]);


  const gasolinerasListData = { gasolinerasList };
  const ubicacionUsuarioData = { ubicacionUsuario, setUbicacionUsuario, status };


  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <GasolinerasListContext.Provider value={gasolinerasListData}>
            <UserUbicationContext.Provider value={ubicacionUsuarioData}>
              {gasolinerasList.length == 0 ? <Spinner /> :
                <>
                  <Header />
                  <Main />
                  <Footer />
                </>
              }
            </UserUbicationContext.Provider>
          </GasolinerasListContext.Provider>
        </AuthContextProvider>

      </BrowserRouter>
    </>
  )
}

export default App
