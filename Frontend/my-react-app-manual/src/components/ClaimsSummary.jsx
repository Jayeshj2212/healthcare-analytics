import React from 'react';

const formatAmount = (amount) => {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  } else if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  }
  return `₹${amount}`;
};

const sumYearlyClaims = (yearlyData) => {
  return Object.values(yearlyData).reduce((sum, count) => sum + count, 0);
};

const ClaimsSummary = ({ data = {} }) => {
  const cashlessYearly = data.cashless_yearly_data || {};
  const reimbursementYearly = data.reimbursement_yearly_data || {};
  const medicalYearly = data.medical_yearly_data || {};
  const surgicalYearly = data.surgical_yearly_data || {};

  const totalCashlessClaims = sumYearlyClaims(cashlessYearly);
  const totalReimbursementClaims = sumYearlyClaims(reimbursementYearly);
  const totalMedicalClaims = sumYearlyClaims(medicalYearly);
  const totalSurgicalClaims = sumYearlyClaims(surgicalYearly);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow p-4 claim-card">
        <div className="flex justify-between">
          <div>
            <h3 className="text-3xl font-bold text-[#1261A0]">{formatAmount(data.cashless_claims)}</h3>
            <p className="text-sm text-gray-500">Cashless Claims</p>
            <p className="text-xs text-gray-400">({data.cashless_claims_count || 0} claims)</p>
          </div>
          <div className="bg-blue-100 h-12 w-12 rounded-full flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 10H21M7 15H8M12 15H13M6 19H18C19.6569 19 21 17.6569 21 16V8C21 6.34315 19.6569 5 18 5H6C4.34315 5 3 6.34315 3 8V16C3 17.6569 4.34315 19 6 19Z" stroke="#1261A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Total Claims</span>
            <span className="text-sm font-medium text-gray-700">{totalCashlessClaims}</span>
          </div>
          <div className="mt-2 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">2023</span>
              <span className="text-gray-500">{cashlessYearly["2023"] || 0}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">2024</span>
              <span className="text-gray-500">{cashlessYearly["2024"] || 0}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">2025</span>
              <span className="text-gray-500">{cashlessYearly["2025"] || 0}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4 claim-card">
        <div className="flex justify-between">
          <div>
            <h3 className="text-3xl font-bold text-[#1261A0]">{formatAmount(data.reimbursement_claims)}</h3>
            <p className="text-sm text-gray-500">Reimbursement Claims</p>
            <p className="text-xs text-gray-400">({data.reimbursement_claims_count || 0} claims)</p>
          </div>
          <div className="bg-blue-100 h-12 w-12 rounded-full flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#1261A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2V8H20" stroke="#1261A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 13H8" stroke="#1261A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 17H8" stroke="#1261A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 9H9H8" stroke="#1261A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Total Claims</span>
            <span className="text-sm font-medium text-gray-700">{totalReimbursementClaims}</span>
          </div>
          <div className="mt-2 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">2023</span>
              <span className="text-gray-500">{reimbursementYearly["2023"] || 0}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">2024</span>
              <span className="text-gray-500">{reimbursementYearly["2024"] || 0}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">2025</span>
              <span className="text-gray-500">{reimbursementYearly["2025"] || 0}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4 claim-card">
        <div className="flex justify-between">
          <div>
            <h3 className="text-3xl font-bold text-[#1261A0]">{formatAmount(data.medical_claims)}</h3>
            <p className="text-sm text-gray-500">Medical Claims</p>
            <p className="text-xs text-gray-400">({data.medical_claims_counts || 0} claims)</p>
          </div>
          <div className="bg-blue-100 h-12 w-12 rounded-full flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 12H18L15 21L9 3L6 12H2" stroke="#1261A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Total Claims</span>
            <span className="text-sm font-medium text-gray-700">{totalMedicalClaims}</span>
          </div>
          <div className="mt-2 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">2023</span>
              <span className="text-gray-500">{medicalYearly["2023"] || 0}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">2024</span>
              <span className="text-gray-500">{medicalYearly["2024"] || 0}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">2025</span>
              <span className="text-gray-500">{medicalYearly["2025"] || 0}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4 claim-card">
        <div className="flex justify-between">
          <div>
            <h3 className="text-3xl font-bold text-[#1261A0]">{formatAmount(data.surgical_claims)}</h3>
            <p className="text-sm text-gray-500">Surgical Claims</p>
            <p className="text-xs text-gray-400">({data.surgical_claims_counts || 0} claims)</p>
          </div>
          <div className="bg-blue-100 h-12 w-12 rounded-full flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#1261A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Total Claims</span>
            <span className="text-sm font-medium text-gray-700">{totalSurgicalClaims}</span>
          </div>
          <div className="mt-2 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">2023</span>
              <span className="text-gray-500">{surgicalYearly["2023"] || 0}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">2024</span>
              <span className="text-gray-500">{surgicalYearly["2024"] || 0}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">2025</span>
              <span className="text-gray-500">{surgicalYearly["2025"] || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimsSummary; 