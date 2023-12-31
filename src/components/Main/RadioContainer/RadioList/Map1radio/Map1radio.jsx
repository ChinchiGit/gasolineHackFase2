import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


const Map1radio= ({data}) => {
  
  console.log("dentro de mapa provincia", data);
  

  const customMarkerIcon = new L.Icon({
    iconUrl: "/assets/img/dispenser.png",
    iconSize: [55, 55], // Tamaño del ícono
    iconAnchor: [5, 5], // Punto de anclaje del ícono

  });


  const paintMapList = () => {
    return data.slice(0,9).map((element) => (
      <Marker position={[element.Latitud, element["Longitud (WGS84)"]]} icon={customMarkerIcon} />      
    ));
  };





  return (
    <>
      {data.length > 0 && (
        <MapContainer center={[data[0].Latitud, data[0]["Longitud (WGS84)"]]} zoom={10} style={{ height: '400px', width: '90%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {paintMapList()}
          
        </MapContainer>
      )}
    </>
  );
};

export default Map1radio;
