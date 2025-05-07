import React from 'react';
import { Calendar, Filter } from 'lucide-react';

const TimelineFilter = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-wrap items-center justify-between space-x-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center space-x-4">
        {/* Specialization Filter */}
        <div className="flex items-center">
          <label className="block text-sm sm:text-base font-medium text-gray-700 mr-2">Specialization:</label>
          <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
            <option>All Specializations</option>
            <option>Cardiology</option>
            <option>Orthopedics</option>
            <option>Neurology</option>
            <option>Oncology</option>
          </select>
        </div>

        {/* Date Range Filter */}
        <div className="flex flex-wrap items-center">
          <div className="relative">
            <input 
              type="text" 
              className="pl-10 pr-4 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-300 focus:border-blue-300 w-full sm:w-auto"
              placeholder="From Date"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          <span className="mx-2">to</span>
          <div className="relative">
            <input 
              type="text" 
              className="pl-10 pr-4 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-300 focus:border-blue-300 w-full sm:w-auto"
              placeholder="To Date"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* View Type Filter */}
        <div className="flex items-center">
          <label className="block text-sm sm:text-base font-medium text-gray-700 mr-2">View Type:</label>
          <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
            <option>Count</option>
            <option>Amount</option>
            <option>Both</option>
          </select>
        </div>

        {/* Claims Type Filter */}
        <div className="flex items-center">
          <label className="block text-sm sm:text-base font-medium text-gray-700 mr-2">Claims Type:</label>
          <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
            <option>All Claims</option>
            <option>Cashless</option>
            <option>Reimbursement</option>
          </select>
        </div>
      </div>

      {/* Apply Button */}
      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm sm:text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        <Filter className="w-4 h-4 mr-2" />
        Apply
      </button>
    </div>
  );
};

export default TimelineFilter; 