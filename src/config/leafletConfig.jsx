import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

const images = import.meta.globEager('../node_modules/leaflet/dist/images/*.png');

L.Icon.Default.mergeOptions({
  iconRetinaUrl: images['../node_modules/leaflet/dist/images/marker-icon-2x.png'].default,
  iconUrl: images['../node_modules/leaflet/dist/images/marker-icon.png'].default,
  shadowUrl: images['../node_modules/leaflet/dist/images/marker-shadow.png'].default,
});