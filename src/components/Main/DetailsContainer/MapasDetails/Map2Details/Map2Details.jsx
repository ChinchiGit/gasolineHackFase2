import React, { useContext, useEffect, useRef, useState } from 'react';
import { TileLayer, Marker , Popup} from 'react-leaflet';
import { useMap } from 'react-leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import L from 'leaflet';
import { UserUbicationContext } from '../../../../../context/UserUbicationContext';
import { GasolinerasListContext } from '../../../../../context/GasolinerasListContext';

const Map2Details = () => {
  const { ubicacionUsuario } = useContext(UserUbicationContext);
  const { gasolinerasList } = useContext(GasolinerasListContext);
  const [gasolineraDetails, setGasolineraDetails] = useState(null);
  
  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/assets/img/marker-icon-2x.png',
    iconUrl: '/assets/img/marker-icon.png',
    shadowUrl: '/assets/img/marker-shadow.png',
  });

  const customMarkerIcon = new L.Icon({
    iconUrl: "/assets/img/dispenser.png",
    iconSize: [55, 55], // Tamaño del ícono
    iconAnchor: [0, 0], // Punto de anclaje del ícono

  });

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
          <Marker position={end} icon={customMarkerIcon}>
            <Popup>
              <b>{gasolineraDetails.Dirección}</b><br/>Gasolina : {gasolineraDetails["Precio Gasolina 95 E5"]} €<br/>Diesel: {gasolineraDetails["Precio Gasoleo A"]} €
            </Popup>
          </Marker>
        </>
      )}
    </>
  );
};

export default Map2Details;

