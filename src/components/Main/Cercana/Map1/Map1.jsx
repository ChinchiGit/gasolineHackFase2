// Mapa con marcadores personalizados en Leaflet
import React, { useContext } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Importa tu ícono personalizado
// import customIcon from '.assets/images/gasoline-icon.png';
import { GasolinerasListContext } from '../../../../context/GasolinerasListContext';

const Map1 = () => {
  const { gasolinerasList } = useContext(GasolinerasListContext);
  

  // const customMarkerIcon = new L.Icon({
  //   iconUrl: customIcon,
  //   iconSize: [55, 55], // Tamaño del ícono
  //   iconAnchor: [12, 12], // Punto de anclaje del ícono
  //   popupAnchor: [0, -50], // Punto de anclaje del popup
  // });

  return (
    <>
      {gasolinerasList && gasolinerasList.length > 0 && (
        <MapContainer center={[gasolinerasList[0].Latitud, gasolinerasList[0]["Longitud (WGS84)"]]} zoom={15} style={{ height: '400px', width: '400px' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[gasolinerasList[0].Latitud, gasolinerasList[0]["Longitud (WGS84)"]]} />
        </MapContainer>
      )}
    </>
  );
};

export default Map1;
