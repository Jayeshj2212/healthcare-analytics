import React from 'react';
import { BarChart } from 'lucide-react';

const ClaimTypeTrend = ({ data = [] }) => {
  const formatAmount = (amount) => {
    if (isNaN(amount)) return '0K'; // Default to '0K' if amount is NaN
    return amount >= 100000 ? `${(amount / 100000).toFixed(1)}L` : `${(amount / 1000).toFixed(0)}K`;
  };

  const maxClaimed = Math.max(...data.map(item => item.claimed || 0));
  const maxApproved = Math.max(...data.map(item => item.approved || 0));
  const maxYValue = Math.ceil(Math.max(maxClaimed, maxApproved) / 20000) * 20000; // Adjusted to nearest 20K

  // Define a scale factor to convert the percentage to pixels
  const scaleFactor = 2.2; // Adjust this value to fit your design

  console.log('Data:', data);
  console.log('Max Claimed:', maxClaimed);
  console.log('Max Approved:', maxApproved);
  console.log('Max Y-Value:', maxYValue);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-800 flex items-center">
          <BarChart className="w-5 h-5 mr-2 text-[#1261A0]" />
          Claimed vs Approved Amount Trends
        </h2>
        <select className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
          <option>Last 3 Years</option>
          <option>Last 12 Months</option>
          <option>Year to Date</option>
        </select>
      </div>
      
      <div className="relative h-64 chart-container">
        <div className="absolute bottom-0 left-0 right-0 flex justify-around h-48">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center justify-end space-y-2 w-16">
              <div className="relative w-full">
                <div className="absolute bottom-0 w-8 bg-blue-500" style={{ height: `${(item.claimed / maxYValue) * 100 * scaleFactor}px` }}>
                  <span className="absolute bottom-full mb-1 text-xs text-gray-500">{formatAmount(item.claimed)}</span>
                </div>
                <div className="absolute bottom-0 w-8 bg-green-500" style={{ height: `${(item.approved / maxYValue) * 100 * scaleFactor}px`, left: '55%' }}>
                  <span className="absolute bottom-full mb-1 text-xs text-gray-500">{formatAmount(item.approved)}</span>
                </div>
              </div>
              <span className="text-xs text-gray-500">{item.year}</span>
            </div>
          ))}
        </div>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 py-2">
          {[...Array(5)].map((_, i) => (
            <span key={i}>{formatAmount((maxYValue / 4) * (4 - i))}</span>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center mt-4 space-x-6">
        <div className="flex items-center">
          <div className="h-3 w-3 bg-blue-500 rounded-sm mr-1"></div>
          <span className="text-xs text-gray-600">Claimed Amount</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 bg-green-500 rounded-sm mr-1"></div>
          <span className="text-xs text-gray-600">Approved Amount</span>
        </div>
      </div>
    </div>
  );
};

export default ClaimTypeTrend;