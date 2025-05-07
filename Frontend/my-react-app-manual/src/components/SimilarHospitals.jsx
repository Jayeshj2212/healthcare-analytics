import React from 'react';
import { Info } from 'lucide-react';

const SimilarHospitals = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-800 flex items-center">
          Similar Hospitals
          <div className="relative ml-1">
            <Info className="w-4 h-4 text-gray-400 hover:text-[#1261A0] cursor-pointer" />
            <div className="tooltip">
              Hospitals are matched based on: specialization, location proximity, hospital type, bed capacity, and infrastructure score.
            </div>
          </div>
        </h2>
        <div className="text-xs text-gray-500">Based on specialization & location</div>
      </div>
      
      <div className="space-y-4">
        {data.map((hospital, index) => (
          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div>
              <div className="flex items-center">
                <div className="h-3 w-3 bg-yellow-400 rounded-full mr-2"></div>
                <h3 className="font-medium text-gray-800">{hospital.name}</h3>
              </div>
              <div className="mt-1 text-xs text-gray-500">Distance: {hospital.distance} | Hospital Type: {hospital.type}</div>
            </div>
            <div className="text-lg font-bold text-gray-800">₹{hospital.acs.toLocaleString()}</div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
        <div className="flex space-x-4">
          <div className="flex items-center">
            <div className="h-3 w-3 bg-yellow-400 rounded-full mr-1"></div>
            <span className="text-xs text-gray-600">Higher ACS</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 bg-green-500 rounded-full mr-1"></div>
            <span className="text-xs text-gray-600">Lower ACS</span>
          </div>
        </div>
        <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
          View All Similar Hospitals
        </button>
      </div>
    </div>
  );
};

export default SimilarHospitals; 