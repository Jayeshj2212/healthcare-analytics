import React from 'react';
import { BarChart } from 'lucide-react';

const TopDiagnoses = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-800 flex items-center">
          <BarChart className="w-5 h-5 mr-2 text-[#1261A0]" />
          Top ICDs
        </h2>
        <div className="flex space-x-2">
          <button className="px-2 py-4 text-xs bg-[#1261A0] text-white rounded">Count</button>
          <button className="px-2 py-4 text-xs bg-gray-200 text-gray-700 rounded">Amount</button>
        </div>
      </div>
      
      <div className="mt-6 overflow-x-auto custom-scroll">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-3 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ICD Code</th>
              <th scope="col" className="px-3 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
              <th scope="col" className="px-3 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th scope="col" className="px-3 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Cost</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((diagnosis, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">{diagnosis.icd_code}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-center text-gray-800">{diagnosis.count}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-right text-gray-800">₹{diagnosis.amount.toLocaleString()}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-right text-gray-800">₹{diagnosis.avg_cost.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopDiagnoses;