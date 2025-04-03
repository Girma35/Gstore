import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; 

const MyMap = () => {

  const customIcon = new L.Icon({
    iconUrl: '/home/girma/Desktop/project/jobPost/src/assets/icons/AAicon.jpeg',
    iconSize: [35, 35], 
    iconAnchor: [17, 35], 
    popupAnchor: [0, -35], 
  });

  return (
    <MapContainer center={[9.03, 38.74]} zoom={13} style={{ height: "400px", width: "100%" }}>
     
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      
      {/* Custom Marker */}
      <Marker position={[9.03, 38.74]} icon={customIcon}>
        {/* Custom Popup Content */}
        <Popup>
          <div style={{ textAlign: 'center' }}>
            <h3>Welcome to Addis Ababa!</h3>
            <p>Explore the capital of Ethiopia, full of culture and history.</p>
            <a 
              href="https://en.wikipedia.org/wiki/Addis_Ababa" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#0077b5', textDecoration: 'none' }}>
              Learn more
            </a>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MyMap;
