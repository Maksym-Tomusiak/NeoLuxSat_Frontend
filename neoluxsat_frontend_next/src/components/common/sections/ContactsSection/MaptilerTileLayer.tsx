import { TileLayer } from "react-leaflet";

const MaptilerStyledTileLayer = ({ styleId = "streets" }) => {
  const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;

  const url = `https://api.maptiler.com/maps/${styleId}/256/{z}/{x}/{y}.png?key=${apiKey}`;

  const attribution =
    '&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>';

  return (
    <TileLayer attribution={attribution} url={url} minZoom={16} maxZoom={19} />
  );
};

export default MaptilerStyledTileLayer;
