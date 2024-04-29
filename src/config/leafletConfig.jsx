import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/assets/images/marker-icon-2x.png',
  iconUrl: '/assets/images/marker-icon.png',
  shadowUrl: '/assets/images/marker-shadow.png',
});