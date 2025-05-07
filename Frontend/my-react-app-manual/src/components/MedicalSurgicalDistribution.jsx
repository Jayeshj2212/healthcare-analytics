import React, { useState, useEffect } from 'react';
import { PieChart } from 'lucide-react';

console.log('MedicalSurgicalDistribution component is being defined');

const MedicalSurgicalDistribution = ({ data = {} }) => {
  console.log('MedicalSurgicalDistribution component is being rendered');
  console.log('Data received:', data);

  const [viewType, setViewType] = useState('percentage');

  useEffect(() => {
    console.log('Data received in useEffect:', data);
  }, [data]);

  // Destructure the necessary data
  const {
    medical_claims_percentage = {},
    surgical_claims_percentage = {},
    medical_claims_amount = {},
    surgical_claims_amount = {},
    medical_claims_count = {},
    surgical_claims_count = {},
    average_medical_claim,
    average_surgical_claim,
    approval_rate
  } = data || {}; // Ensure data is destructured from the correct level

  // Log the destructured values to verify they are correct
  console.log('medical_claims_percentage:', medical_claims_percentage);
  console.log('surgical_claims_percentage:', surgical_claims_percentage);
  console.log('medical_claims_amount:', medical_claims_amount);
  console.log('surgical_claims_amount:', surgical_claims_amount);
  console.log('medical_claims_count:', medical_claims_count);
  console.log('surgical_claims_count:', surgical_claims_count);

  const approvedMedical = viewType === 'percentage' ? medical_claims_percentage.approved : viewType === 'amount' ? medical_claims_amount.approved : medical_claims_count.approved;
  const approvedSurgical = viewType === 'percentage' ? surgical_claims_percentage.approved : viewType === 'amount' ? surgical_claims_amount.approved : surgical_claims_count.approved;
  const claimedMedical = viewType === 'percentage' ? medical_claims_percentage.claimed : viewType === 'amount' ? medical_claims_amount.claimed : medical_claims_count.claimed;
  const claimedSurgical = viewType === 'percentage' ? surgical_claims_percentage.claimed : viewType === 'amount' ? surgical_claims_amount.claimed : surgical_claims_count.claimed;

  const renderValue = (value) => (value !== undefined && value !== null) ? value : 'N/A';

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-800 flex items-center">
          <PieChart className="w-5 h-5 mr-2 text-[#1261A0]" />
          Medical vs Surgical
        </h2>
        <div className="flex space-x-2">
          <select 
            className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            value={viewType}
            onChange={(e) => setViewType(e.target.value)}
          >
            <option value="count">Count</option>
            <option value="percentage">Percentage</option>
            <option value="amount">Amount</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <h3 className="text-center text-sm font-medium text-gray-700">Approved</h3>
          <div className="relative h-40 w-40 mx-auto">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#90CAF9" strokeWidth="20" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1261A0" strokeWidth="20" strokeDasharray="251.2 251.2" strokeDashoffset="201" />
              <text x="50" y="50" dominantBaseline="middle" textAnchor="middle" fontSize="9" fontWeight="bold">
                {viewType === 'count' ? `${renderValue(approvedMedical)} / ${renderValue(approvedSurgical)}` : viewType === 'percentage' ? `${renderValue(approvedMedical)}% / ${renderValue(approvedSurgical)}%` : `₹${renderValue(approvedMedical)}L / ₹${renderValue(approvedSurgical)}L`}
              </text>
            </svg>
          </div>
          <div className="flex justify-center space-x-6">
            <div className="flex items-center">
              <div className="h-3 w-3 bg-[#1261A0] rounded-sm mr-1"></div>
              <span className="text-xs text-gray-600">Medical</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 bg-[#90CAF9] rounded-sm mr-1"></div>
              <span className="text-xs text-gray-600">Surgical</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-center text-sm font-medium text-gray-700">Claimed</h3>
          <div className="relative h-40 w-40 mx-auto">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#90CAF9" strokeWidth="20" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1261A0" strokeWidth="20" strokeDasharray="251.2 251.2" strokeDashoffset="176" />
              <text x="50" y="50" dominantBaseline="middle" textAnchor="middle" fontSize="9" fontWeight="bold">
                {viewType === 'count' ? `${renderValue(claimedMedical)} / ${renderValue(claimedSurgical)}` : viewType === 'percentage' ? `${renderValue(claimedMedical)}% / ${renderValue(claimedSurgical)}%` : `₹${renderValue(claimedMedical)}L / ₹${renderValue(claimedSurgical)}L`}
              </text>
            </svg>
          </div>
          <div className="flex justify-center space-x-6">
            <div className="flex items-center">
              <div className="h-3 w-3 bg-[#1261A0] rounded-sm mr-1"></div>
              <span className="text-xs text-gray-600">Medical</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 bg-[#90CAF9] rounded-sm mr-1"></div>
              <span className="text-xs text-gray-600">Surgical</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <h4 className="text-xs font-medium text-gray-500">Average Medical Claim</h4>
            <p className="text-lg font-semibold text-gray-800">₹{average_medical_claim}</p>
          </div>
          <div>
            <h4 className="text-xs font-medium text-gray-500">Average Surgical Claim</h4>
            <p className="text-lg font-semibold text-gray-800">₹{average_surgical_claim}</p>
          </div>
          <div>
            <h4 className="text-xs font-medium text-gray-500">Approval Rate</h4>
            <p className="text-lg font-semibold text-gray-800">{approval_rate}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

console.log('MedicalSurgicalDistribution component definition complete');

export default MedicalSurgicalDistribution; 