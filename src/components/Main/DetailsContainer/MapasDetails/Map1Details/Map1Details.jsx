import React, { useContext, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { GasolinerasListContext } from '../../../../../context/GasolinerasListContext';

const Map1Details = () => {
  const { gasolinerasList } = useContext(GasolinerasListContext);
  const [gasolineraDetails, setGasolineraDetails] = useState(null);

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
          style={{ height: '400px', width: '400px' }}
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
          />
        </MapContainer>
      )}
    </>
  );
};

export default Map1Details;
