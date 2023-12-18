import React, { useContext, useEffect, useRef, useState } from 'react';
import { TileLayer, Marker } from 'react-leaflet';
import { useMap } from 'react-leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import { UserUbicationContext } from '../../../../../context/UserUbicationContext';
import { GasolinerasListContext } from '../../../../../context/GasolinerasListContext';

const Map2Details = () => {
  const { ubicacionUsuario } = useContext(UserUbicationContext);
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

  const map = useMap();
  const routingControlRef = useRef(null);

  console.log("desde mapa con ruta", ubicacionUsuario.latitud);

  // Verificar que ubicacionUsuario y gasolineraDetails estén definidos
  const start = ubicacionUsuario ? [ubicacionUsuario.latitud, ubicacionUsuario.longitud] : null;
  const end = gasolineraDetails ? [gasolineraDetails.Latitud, gasolineraDetails["Longitud (WGS84)"]] : null;

  useEffect(() => {
    // Verificar que start y end estén definidos
    if (start && end && !routingControlRef.current) {
      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(start[0], start[1]),
          L.latLng(end[0], end[1])
        ],
        routeWhileDragging: true,
      }).addTo(map);

      routingControlRef.current = routingControl;
    } else if (start && end && routingControlRef.current) {
      routingControlRef.current.setWaypoints([
        L.latLng(start[0], start[1]),
        L.latLng(end[0], end[1])
      ]);
    }
  }, [start, end, map]);

  // Renderizar solo si start y end están definidos
  return (
    <>
      {start && end && (
        <>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={start}></Marker>
          <Marker position={end}></Marker>
        </>
      )}
    </>
  );
};

export default Map2Details;

