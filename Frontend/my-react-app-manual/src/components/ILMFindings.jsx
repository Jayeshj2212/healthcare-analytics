import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ILMFindings = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-800 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-[#1261A0]" />
          ILM Findings
        </h2>
        <span className="text-sm px-2 py-1 bg-yellow-100 text-yellow-800 rounded">{data.length} Issues Found</span>
      </div>
      
      <div className="space-y-3">
        {data.map((finding, index) => (
          <div key={index} className={`p-3 ${finding.impact === 'High' ? 'bg-red-50 border-l-4 border-red-500' : finding.impact === 'Medium' ? 'bg-orange-50 border-l-4 border-orange-500' : 'bg-yellow-50 border-l-4 border-yellow-500'} rounded`}>
            <h3 className="font-medium text-gray-800">{finding.title}</h3>
            <p className="text-sm text-gray-600 mt-1">
              {finding.description}
            </p>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-xs text-gray-500">Impact: {finding.impact}</span>
              <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">View Details</button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          View All Findings
        </button>
      </div>
    </div>
  );
};

export default ILMFindings; 