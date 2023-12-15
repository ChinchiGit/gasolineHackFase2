import React, { useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { GasolinerasListContext } from '../../../../../context/GasolinerasListContext';

const Map1 = () => {

  const {gasolinerasList} = useContext(GasolinerasListContext);

  console.log(gasolinerasList[0]);
  return (
    <MapContainer center={[gasolinerasList[0].Latitud, gasolinerasList[0]["Longitud (WGS84)"]]} zoom={15} style={{ height: '400px', width: '400px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker key={gasolinerasList[0].IDEESS} position={[gasolinerasList[0].Latitud, gasolinerasList[0]["Longitud (WGS84)"] ]}>
  
      </Marker>

    </MapContainer>
  );
};

export default Map1;
