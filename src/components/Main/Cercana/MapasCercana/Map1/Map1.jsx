import React, { useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { GasolinerasListContext } from '../../../../../context/GasolinerasListContext';
import L from 'leaflet';

const Map1 = () => {

  const {gasolinerasList} = useContext(GasolinerasListContext);

  console.log(gasolinerasList[0]);

  const customMarkerIcon = new L.Icon({
    iconUrl: "/assets/img/dispenser.png",
    iconSize: [55, 55], // Tamaño del ícono
    iconAnchor: [5, 5], // Punto de anclaje del ícono

  });

  return (
    <MapContainer center={[gasolinerasList[0].Latitud, gasolinerasList[0]["Longitud (WGS84)"]]} zoom={15} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker key={gasolinerasList[0].IDEESS} position={[gasolinerasList[0].Latitud, gasolinerasList[0]["Longitud (WGS84)"] ]} icon={customMarkerIcon}>
  
      </Marker>

    </MapContainer>
  );
};

export default Map1;
