import React from 'react';
import { BarChart, AlertTriangle } from 'lucide-react';

const ClaimsSummaryOverview = ({ data = {} }) => {
  // Log the full data object to verify its structure
  console.log('ClaimsSummaryOverview full data:', JSON.stringify(data, null, 2));

  // Access the nested properties from the data object
  const {
    claim_count = 0,
    total_amount = 0,
    yearly_data = {}
  } = data.claims_summary || {};

  const {
    total_rejected = 0,
    total_rejected_amount = 0,
    rejected_yearly_data = {}
  } = data.rejected_claims || {};

  const availableYears = Object.keys(yearly_data).sort().slice(-3);

  // Log the extracted values to verify they are correct
  console.log('Total Claims:', claim_count);
  console.log('Total Amount:', total_amount);
  console.log('Total Rejected Claims:', total_rejected);
  console.log('Rejected Amount:', total_rejected_amount);
  console.log('Yearly Data (Total Claims):', yearly_data);
  console.log('Yearly Data (Rejected Claims):', rejected_yearly_data);

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Total Claims */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-800 flex items-center">
              <BarChart className="w-5 h-5 mr-2 text-[#1261A0]" />
              Total Claims Overview
            </h2>
            <select className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
              <option>Count</option>
              <option>Amount</option>
            </select>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-2xl font-bold text-[#1261A0]">{claim_count}</h3>
                <p className="text-sm text-gray-600">Total Claims</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-lg font-semibold text-[#1261A0]">₹{total_amount}</p>
              </div>
            </div>

            <div className="space-y-3">
              {availableYears.map(year => (
                <div key={year} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{year}</span>
                  <div className="flex-1 mx-4">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-blue-500 rounded-full" style={{width: `${(yearly_data[year] / (claim_count || 1)) * 100}%`}}></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{yearly_data[year] || 0}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Rejected & Repudiated Claims */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-800 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
              Rejected & Repudiated Claims
            </h2>
            <select className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
              <option>Count</option>
              <option>Amount</option>
            </select>
          </div>

          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-2xl font-bold text-red-600">{total_rejected}</h3>
                <p className="text-sm text-gray-600">Total Rejected Claims</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-lg font-semibold text-red-600">₹{total_rejected_amount}</p>
              </div>
            </div>

            <div className="space-y-3">
              {Object.keys(rejected_yearly_data).sort().slice(-3).map(year => (
                <div key={year} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{year}</span>
                  <div className="flex-1 mx-4">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-red-600 rounded-full" style={{width: `${(rejected_yearly_data[year] / (total_rejected || 1)) * 100}%`}}></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{rejected_yearly_data[year] || 0}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimsSummaryOverview;