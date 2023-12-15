// Mapa con enrutamiento en Leaflet con coordenadas definidas en el componente
import React, { useEffect, useRef , useContext} from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import { GasolinerasListContext } from '../../../../context/GasolinerasListContext';
import { UserUbicationContext } from '../../../../context/UserUbicationContext';

const Map2 = () => {
  const mapRef = useRef(null);
  const { gasolinerasList } = useContext(GasolinerasListContext)
  const { ubicacionUsuario } = useContext(UserUbicationContext)
  console.log("Desde mapa 2 --->", ubicacionUsuario);

  useEffect(() => {
    // Coordenadas de origen y destino
    const latitudOrigen = ubicacionUsuario.latitud
    const longitudOrigen = ubicacionUsuario.longitud 
    const latitudDestino = gasolinerasList[0].Latitud
    const longitudDestino = gasolinerasList[0]["Longitud (WGS84)"]

    // Inicializa el mapa de Leaflet
    const map2 = L.map(mapRef.current).setView([0, 0], 2);

    // Añade capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map2);

    // Crea marcadores para el origen y el destino
    const startMarker = L.marker([latitudOrigen, longitudOrigen]).addTo(map2);
    const endMarker = L.marker([latitudDestino, longitudDestino]).addTo(map2);

    // Configura el control de enrutamiento
    L.Routing.control({
      waypoints: [
        L.latLng(latitudOrigen, longitudOrigen),
        L.latLng(latitudDestino, longitudDestino)
      ],
      routeWhileDragging: true,
    }).addTo(map2);
  }, [ubicacionUsuario]);

  return <div ref={mapRef} style={{ height: '400px', width: '400px' }} />;
};

export default Map2;
