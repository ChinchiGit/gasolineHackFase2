// Mapa con marcadores personalizados en Leaflet
import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Importa tu ícono personalizado
// import customIcon from '.assets/images/gasoline-icon.png';

const Map1provincia= ({data}) => {
  
  console.log("dentro de mapa provincia", data);
  

  // const customMarkerIcon = new L.Icon({
  //   iconUrl: customIcon,
  //   iconSize: [55, 55], // Tamaño del ícono
  //   iconAnchor: [12, 12], // Punto de anclaje del ícono
  //   popupAnchor: [0, -50], // Punto de anclaje del popup
  // });


  const paintMapList = () => {
    return data.slice(0,9).map((element) => (
      <Marker position={[element.Latitud, element["Longitud (WGS84)"]]} />      
    ));
  };





  return (
    <>
      {data.length > 0 && (
        <MapContainer center={[data[0].Latitud, data[0]["Longitud (WGS84)"]]} zoom={10} style={{ height: '400px', width: '400px' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {paintMapList()}
          {/* <Marker position={[gasolinerasList[0].Latitud, gasolinerasList[0]["Longitud (WGS84)"]]} /> */}
        </MapContainer>
      )}
    </>
  );
};

export default Map1provincia;
