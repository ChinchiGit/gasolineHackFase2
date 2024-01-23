import React, { useContext, useEffect, useRef } from 'react';
import { TileLayer, Marker, Popup } from 'react-leaflet';
import { useMap } from 'react-leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { UserUbicationContext } from '../../../../../context/UserUbicationContext';
import { GasolinerasListContext } from '../../../../../context/GasolinerasListContext';
import L from 'leaflet';
import 'leaflet-routing-machine';

const Map2 = () => {
  const { ubicacionUsuario } = useContext(UserUbicationContext);
  const { gasolinerasList } = useContext(GasolinerasListContext);

  const customMarkerIcon = new L.Icon({
    iconUrl: "/assets/img/dispenser.png",
    iconSize: [55, 55], // Tamaño del ícono
    iconAnchor: [0, 0], // Punto de anclaje del ícono

  });

  const map = useMap();
  const routingControlRef = useRef(null);


  const start = [ubicacionUsuario.latitud, ubicacionUsuario.longitud];
  const end = [gasolinerasList[0]?.Latitud, gasolinerasList[0]?.["Longitud (WGS84)"]];

  useEffect(() => {
    if (start && end && !routingControlRef.current) {
      // Creamos un nuevo control de rutas solo si no existe
      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(start[0], start[1]),
          L.latLng(end[0], end[1])
        ],
        routeWhileDragging: false,
      }).addTo(map);

      routingControlRef.current = routingControl;
    } else if (start && end && routingControlRef.current) {
      // Actualizamos los waypoints si el control de rutas ya existe
      routingControlRef.current.setWaypoints([
        L.latLng(start[0], start[1]),
        L.latLng(end[0], end[1])
      ]);
    }
  }, [start, end, map]);

  return (
    <>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {start && <Marker position={start}></Marker>}
      {end && <Marker position={end} icon={customMarkerIcon}>
        <Popup>
          <b>{gasolinerasList[0].Dirección}</b><br/>Gasolina : {gasolinerasList[0]["Precio Gasolina 95 E5"]} €<br/>Diesel: {gasolinerasList[0]["Precio Gasoleo A"]} €
        </Popup>
        
      </Marker>}
    </>
  );
};

export default Map2;
