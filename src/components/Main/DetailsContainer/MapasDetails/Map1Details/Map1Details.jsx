import React, { useContext, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { GasolinerasListContext } from '../../../../../context/GasolinerasListContext';
import L from 'leaflet';

const Map1Details = () => {
  const { gasolinerasList } = useContext(GasolinerasListContext);
  const [gasolineraDetails, setGasolineraDetails] = useState(null);

  const customMarkerIcon = new L.Icon({
    iconUrl: "/assets/img/dispenser.png",
    iconSize: [55, 55], // Tamaño del ícono
    iconAnchor: [5, 5], // Punto de anclaje del ícono

  });

  useEffect(() => {
    const getGasolineraDetails = () => {
      // OBTENER LA ID QUE LLEGA POR QUERY
      const id = location.pathname.split(":").pop();

      // OBTENER LA GASOLINERA QUE CORRESPONDE A ESA ID
      const gasolineraQuery = gasolinerasList.find(
        (gasolinera) => gasolinera.IDEESS == id
      );

      setGasolineraDetails(gasolineraQuery);
    };

    getGasolineraDetails();
  }, [gasolinerasList]); 



  return (
    <>
      {gasolineraDetails && (
        <MapContainer
          center={[
            gasolineraDetails.Latitud,
            gasolineraDetails["Longitud (WGS84)"]
          ]}
          zoom={15}
          style={{ height: '400px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker
            key={gasolineraDetails.IDEESS}
            position={[
              gasolineraDetails.Latitud,
              gasolineraDetails["Longitud (WGS84)"]
            ]}
            icon={customMarkerIcon}
          />
        </MapContainer>
      )}
    </>
  );
};

export default Map1Details;
