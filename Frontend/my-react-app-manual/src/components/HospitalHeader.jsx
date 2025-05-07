import React from 'react';
import { MapPin, Calendar } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Import Leaflet icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const HospitalHeader = ({ data }) => {
  const { latitude, longitude, incurred_count_percentage, claim_count_percentage } = data;

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex flex-col sm:flex-row items-start space-x-0 sm:space-x-4">
          <div className="bg-red-100 p-3 rounded-lg mb-2 sm:mb-0">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="#E53E3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 22V12H15V22" stroke="#E53E3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div className="flex flex-col sm:flex-row items-center space-x-2 mt-2">
              <h2 className="text-xl font-bold text-gray-800 flex-grow">{data.name} - {data.location}</h2>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 mt-1 space-y-1 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center flex-wrap">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{data.location} | ID: {data.hospital_id}</span>
              </div>
              <div className="flex items-center flex-wrap">
                <Calendar className="w-4 h-4 mr-1" />
                <span>Year of Empanelment: {data.year_of_empanelment}</span>
                <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-bold ml-2">{data.is_primary ? 'Primary' : 'Secondary'}</span>
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-bold ml-2">Corporate Chain: {data.is_corporate_chain ? 'Yes' : 'No'}</span>
              </div>
            </div>
            <div className="mt-4 mr-12 p-2 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-800 mb-1">Claims Analysis Overview</h3>
              <div className="flex justify-between items-center">
                <div className="text-center flex-1">
                  <h4 className="text-xl font-bold text-gray-800">{data.claims_summary.incurred_count}</h4>
                  <p className="text-sm text-gray-600">Incurred Count</p>
                  <p className="text-xs text-gray-500">{incurred_count_percentage}% of Total</p>
                </div>
                <div className="border-l border-gray-300 h-10 mx-2"></div>
                <div className="text-center flex-1">
                  <h4 className="text-xl font-bold text-gray-800">{data.claims_summary.claim_count}</h4>
                  <p className="text-sm text-gray-600">Claim Count</p>
                  <p className="text-xs text-gray-500">{claim_count_percentage}% of Total</p>
                </div>
              </div>
              <div className="flex justify-center mt-1">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">{data.claims_summary.annual_count} - Annual Count</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 md:mt-0 w-full md:w-1/2">
          <MapContainer center={[latitude, longitude]} zoom={15} className="h-48 w-full rounded-lg shadow">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[latitude, longitude]} icon={L.icon({
              iconUrl: markerIcon,
              shadowUrl: markerShadow,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41],
              iconRetinaUrl: markerIcon2x,
              className: 'leaflet-marker-icon-red'
            })}>
              <Popup>{data.name}</Popup>
            </Marker>
          </MapContainer>
          <div className="flex justify-center mt-2">
            <div className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm shadow">6.5 KM From City Center</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalHeader; 