import React from 'react';
import { XCircle } from 'lucide-react';

const RejectedClaims = ({ data }) => {
  console.log('RejectedClaims data:', data.rejected_claims);
  console.log('Claims Summary:', data.claims_summary);

  const {
    total_rejected = 0,
    total_repudiated = 0,
  } = data.rejected_claims || {};

  const {
    incurred_count = 0,
  } = data.claims_summary || {};

  console.log('Incurred Count:', incurred_count);

  const reasons = data.rejected_claims.reasons || [];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-800 flex items-center">
          <XCircle className="w-5 h-5 mr-2 text-[#1261A0]" />
          Rejected & Repudiated Claims
        </h2>
        <select className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
          <option>Last 12 Months</option>
          <option>Current Year</option>
          <option>All Time</option>
        </select>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <h3 className="text-3xl font-bold text-red-600">{total_rejected}</h3>
          <p className="text-sm text-gray-600">Rejected Claims</p>
          <p className="text-xs text-gray-500 mt-1">
            ~{incurred_count > 0 ? ((total_rejected / incurred_count) * 100).toFixed(1) : 0}% of total claims
          </p>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <h3 className="text-3xl font-bold text-orange-600">{total_repudiated}</h3>
          <p className="text-sm text-gray-600">Repudiated Claims</p>
          <p className="text-xs text-gray-500 mt-1">
            ~{incurred_count > 0 ? ((total_repudiated / incurred_count) * 100).toFixed(1) : 0}% of total claims
          </p>
        </div>
      </div>
      
      <h3 className="font-medium text-gray-700 mb-2">Common Rejection Reasons</h3>
      <div className="space-y-2 mb-4">
        {reasons.map((reason, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{reason.reason}</span>
            <div className="w-1/2 bg-gray-200 rounded-full h-2.5">
              <div className="bg-red-600 h-2.5 rounded-full" style={{width: `${reason.percentage}%`}}></div>
            </div>
            <span className="text-sm text-gray-600">{reason.percentage}%</span>
          </div>
        ))}
      </div>
      
      <div className="mt-2 pt-2 border-t border-gray-100 flex justify-end">
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          View Rejected Claims Report
        </button>
      </div>
    </div>
  );
};

export default RejectedClaims; 