import React, { useContext, useEffect, useRef } from 'react';
import { TileLayer, Marker } from 'react-leaflet';
import { useMap } from 'react-leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { UserUbicationContext } from '../../../../../context/UserUbicationContext';
import { GasolinerasListContext } from '../../../../../context/GasolinerasListContext';

import 'leaflet-routing-machine';

const Map2 = () => {
  const { ubicacionUsuario } = useContext(UserUbicationContext);
  const { gasolinerasList } = useContext(GasolinerasListContext);

  const map = useMap();
  const routingControlRef = useRef(null);

  console.log("desde mapa con ruta", ubicacionUsuario.latitud);

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
        routeWhileDragging: true,
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
      {end && <Marker position={end}></Marker>}
    </>
  );
};

export default Map2;
