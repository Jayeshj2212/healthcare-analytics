import React, { useState } from 'react';
import { Activity, FileText, TrendingUp, Users, AlertTriangle, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMsal, useAccount } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';

const AnalyticsCard = ({ icon: Icon, title, description, metrics }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Icon className="w-6 h-6 text-[#1261A0]" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
      </div>
    </div>
    <div className="mt-4 grid grid-cols-2 gap-4">
      {metrics.map((metric, index) => (
        <div key={index}>
          <p className="text-sm text-gray-500">{metric.label}</p>
          <p className="text-lg font-semibold text-[#1261A0]">{metric.value}</p>
        </div>
      ))}
    </div>
    <Link 
      to="/dashboard" 
      className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1261A0] bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      GET REPORT
    </Link>
  </div>
);

const Home = () => {
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {});
  const [showRequestAccess, setShowRequestAccess] = useState(false);

  const handleLogin = () => {
    instance.loginPopup({
      scopes: ["User.Read"],
      prompt: "select_account"
    }).catch(e => {
      console.error(e);
    });
  };

  const handleLogout = () => {
    instance.logoutPopup().catch(e => {
      console.error(e);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/src/img/logo.png" alt="Allianz Logo" className="h-8 mr-2" />
            <h1 className="text-xl font-semibold">Healthcare Analytics Platform</h1>
          </div>
          <div className="flex items-center space-x-4">
            {account ? (
              <div className="flex items-center space-x-2">
                <img src="/path/to/profile-pic.png" alt="Profile" className="h-8 w-8 rounded-full" />
                <span>{account.name}</span>
                <button onClick={handleLogout} className="px-4 py-2 bg-white text-blue-700 rounded-md hover:bg-gray-100 transition-colors">
                  Log Out
                </button>
              </div>
            ) : (
              <>
                <button onClick={handleLogin} className="px-4 py-2 bg-white text-blue-700 rounded-md hover:bg-gray-100 transition-colors">
                  Log In
                </button>
                <button onClick={() => setShowRequestAccess(true)} className="px-4 py-2 bg-white text-blue-700 rounded-md hover:bg-gray-100 transition-colors">
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {showRequestAccess && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Request Access</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">First Name</label>
                <input type="text" className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Last Name</label>
                <input type="text" className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email ID</label>
                <input type="email" className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Contact</label>
                <input type="text" className="w-full px-3 py-2 border rounded-md" />
              </div>
              <button type="submit" className="w-full px-4 py-2 bg-blue-700 text-white rounded-md">Submit</button>
              <button type="button" onClick={() => setShowRequestAccess(false)} className="w-full mt-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md">Cancel</button>
            </form>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Healthcare Claims Analytics</h1>
          <p className="text-lg text-gray-600">
            Comprehensive analytics and insights for healthcare claims management and hospital performance monitoring
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnalyticsCard
            icon={Activity}
            title="Claims Overview"
            description="Track and analyze claims processing efficiency and patterns"
            metrics={[
              { label: "Total Claims", value: "74" },
              { label: "Processed Amount", value: "₹61.6L" }
            ]}
          />

          <AnalyticsCard
            icon={TrendingUp}
            title="Performance Metrics"
            description="Monitor key performance indicators and benchmarks"
            metrics={[
              { label: "Efficiency Index", value: "87.3%" },
              { label: "Avg. Processing Time", value: "3.2 days" }
            ]}
          />

          <AnalyticsCard
            icon={AlertTriangle}
            title="Risk Analysis"
            description="Identify and analyze claim rejection patterns"
            metrics={[
              { label: "Rejected Claims", value: "11" },
              { label: "Risk Score", value: "Low" }
            ]}
          />
        </div>
      </main>
    </div>
  );
};

export default Home; 