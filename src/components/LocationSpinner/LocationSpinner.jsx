import React, { useContext } from 'react';
import { UserUbicationContext } from "../../context/UserUbicationContext";

const LocationSpinner = () => {
  const { ubicacionUsuario, setUbicacionUsuario } = useContext(UserUbicationContext);

  const solicitarUbicacion = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUbicacionUsuario({ latitud: latitude, longitud: longitude });
        },
        (error) => {
          console.error("Error obteniendo la ubicación:", error);
          alert("Por favor, habilita la ubicación en la configuración de tu navegador.");
        }
      );
    } else {
      alert("Geolocalización no soportada por este navegador.");
    }
  };

  return (
    <>
      <div className="spinner">
        <img src="../../../assets/img/logo_spinner.png" alt="Logo" id='logoGH'/>
        <h4>🙏🏻​ Por favor 📍​🗺️​HABILITA TU UBICACIÓN🗺️📍​​ <br></br> para poder ofrecerte las gasolineras <br></br> ordenadas por distancia y la ruta a seguir.</h4>
        <h3>¡Gracias!</h3>
        <button onClick={solicitarUbicacion}>Habilitar Ubicación</button>
      </div>
    </>
  );
};

export default LocationSpinner;
