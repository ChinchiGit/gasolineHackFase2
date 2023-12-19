import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Map1Details from './Map1Details'; // Importa el componente del mapa con pin
import Map2Details from './Map2Details'; // Importa el componente del mapa con ruta

const MapaConAmbos = () => {
  const [mostrarMap1, setMostrarMap1] = useState(true);

  const toggleMapa = () => {
    setMostrarMap1((prev) => !prev);
  };

  return (
    <div>
      <button onClick={toggleMapa}>
        {mostrarMap1 ? "Cómo Llegar" : "Volver"}
      </button>

      <MapContainer center={[0, 0]} zoom={12} style={{ height: '400px', width: '90%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {mostrarMap1 ? (
          <Map1Details />
        ) : (
          <Map2Details />
        )}
      </MapContainer>
    </div>
  );
};

export default MapaConAmbos;
