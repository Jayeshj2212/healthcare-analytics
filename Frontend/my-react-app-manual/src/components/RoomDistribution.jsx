import React, { useState } from 'react';
import { Home } from 'lucide-react';

const RoomDistribution = () => {
  const roomData = [
    { year: 2018, categories: [
      { type: 'PRIVATE AC', count: 12, percentage: 28.5, amount: 58200 },
      { type: 'SEMI-PRIVATE', count: 9, percentage: 21.4, amount: 43650 },
      { type: 'SEMI-SHARING AC', count: 9, percentage: 21.4, amount: 43650 }
    ]},
    { year: 2019, categories: [
      { type: 'PRIVATE AC', count: 10, percentage: 25.0, amount: 50000 },
      { type: 'SEMI-PRIVATE', count: 8, percentage: 20.0, amount: 40000 },
      { type: 'SEMI-SHARING AC', count: 7, percentage: 17.5, amount: 35000 }
    ]},
    { year: 2020, categories: [
      { type: 'PRIVATE AC', count: 11, percentage: 27.5, amount: 55000 },
      { type: 'SEMI-PRIVATE', count: 9, percentage: 22.5, amount: 45000 },
      { type: 'SEMI-SHARING AC', count: 8, percentage: 20.0, amount: 40000 }
    ]},
    { year: 2021, categories: [
      { type: 'PRIVATE AC', count: 13, percentage: 30.0, amount: 60000 },
      { type: 'SEMI-PRIVATE', count: 10, percentage: 25.0, amount: 50000 },
      { type: 'SEMI-SHARING AC', count: 9, percentage: 22.5, amount: 45000 }
    ]},
    { year: 2022, categories: [
      { type: 'PRIVATE AC', count: 14, percentage: 32.5, amount: 65000 },
      { type: 'SEMI-PRIVATE', count: 11, percentage: 27.5, amount: 55000 },
      { type: 'SEMI-SHARING AC', count: 10, percentage: 25.0, amount: 50000 }
    ]},
    { year: 2023, categories: [
      { type: 'PRIVATE AC', count: 15, percentage: 35.0, amount: 70000 },
      { type: 'SEMI-PRIVATE', count: 12, percentage: 30.0, amount: 60000 },
      { type: 'SEMI-SHARING AC', count: 11, percentage: 27.5, amount: 55000 }
    ]}
  ];

  const [filter, setFilter] = useState('count');

  const getBarHeight = (value) => {
    switch (filter) {
      case 'amount':
        return value / 1000;
      case 'percentage':
        return value * 2;
      default:
        return value * 8;
    }
  };

  const getBarColor = (index) => {
    const colors = ['#0D47A1', '#1976D2', '#42A5F5'];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-800 flex items-center">
          <Home className="w-5 h-5 mr-2 text-[#1261A0]" />
          Year-on-Year Distribution of Room Categories
        </h2>
        <div className="flex space-x-2">
          <select className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" onChange={(e) => setFilter(e.target.value)}>
            <option value="count">Count</option>
            <option value="amount">Amount</option>
            <option value="percentage">Percentage</option>
          </select>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <div className="min-w-full">
          <div className="grid grid-cols-1 gap-4">
            <div className="relative h-80">
              <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                {/* Y-axis labels and grid lines */}
                {[0, 5, 10, 15, 20, 25, 30, 35].map((yValue) => (
                  <g key={yValue}>
                    <text x="0" y={200 - (yValue * 5)} className="text-xs text-gray-500">{yValue}</text>
                    <line x1="20" y1={200 - (yValue * 5)} x2="800" y2={200 - (yValue * 5)} stroke="#e0e0e0" strokeWidth="0.5" />
                  </g>
                ))}
                {roomData.map((yearData, yearIndex) => (
                  <g key={yearIndex} transform={`translate(${yearIndex * 120 + 40}, 0)`}>
                    {yearData.categories.map((category, catIndex) => (
                      <rect
                        key={catIndex}
                        x={(catIndex * 20) + 10}
                        y={200 - getBarHeight(category[filter])}
                        width="15"
                        height={getBarHeight(category[filter])}
                        fill={getBarColor(catIndex)}
                      />
                    ))}
                    <text x="30" y="210" className="text-xs text-gray-500">{yearData.year}</text>
                    {yearData.categories.map((category, catIndex) => (
                      <text
                        key={catIndex}
                        x={(catIndex * 20) + 17.5}
                        y={195 - getBarHeight(category[filter])}
                        className="text-xs text-[#0D47A1]"
                        textAnchor="middle"
                      >
                        {category[filter]}
                      </text>
                    ))}
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4 space-x-6">
        <div className="flex items-center">
          <div className="h-3 w-3 bg-[#0D47A1] rounded-sm mr-1"></div>
          <span className="text-xs text-gray-600">PRIVATE AC</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 bg-[#1976D2] rounded-sm mr-1"></div>
          <span className="text-xs text-gray-600">SEMI-PRIVATE</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 bg-[#42A5F5] rounded-sm mr-1"></div>
          <span className="text-xs text-gray-600">SEMI-SHARING AC</span>
        </div>
      </div>
    </div>
  );
};

export default RoomDistribution; 