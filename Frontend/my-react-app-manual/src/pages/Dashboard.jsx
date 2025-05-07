import React, { useState, useEffect } from 'react';
import { BarChart, LineChart, Info, PieChart, Calendar, TrendingUp, Filter, Users, Package, Home, PanelRight, Bell, MessageSquare, AlertTriangle, ArrowLeft, MapPin } from 'lucide-react';
import '../App.css';
import navbg from '/dist/img/navbg.jpeg'; // Adjust the path as necessary
import HospitalHeader from '../components/HospitalHeader';
import ClaimsSummary from '../components/ClaimsSummary';
import CostClaimsEfficiency from '../components/CostClaimsEfficiency';
import SimilarHospitals from '../components/SimilarHospitals';
import MedicalSurgicalDistribution from '../components/MedicalSurgicalDistribution';
import TopDiagnoses from '../components/TopDiagnoses';
import FeedbackWidget from '../components/FeedbackWidget';
import ILMFindings from '../components/ILMFindings';
import RejectedClaims from '../components/RejectedClaims';
import TimelineFilter from '../components/TimelineFilter';
import ClaimTypeTrend from '../components/ClaimTypeTrend';
import ComponentTrend from '../components/ComponentTrend';
import ClaimsSummaryOverview from '../components/ClaimsSummaryOverview';
import ErrorBoundary from '../components/ErrorBoundary';

const handleBack = () => {
  window.history.back();
};

const Dashboard = () => {
  const [hospitalData, setHospitalData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://127.0.0.1:3000/hospitals/1');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Log the data to verify its structure
        setHospitalData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://127.0.0.1:3000/hospitals/${searchQuery}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Hospital with Partner ID ${searchQuery} not found. Please check the ID and try again.`);
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }
      const data = await response.json();
      console.log('Fetched data for search:', data); // Log the data to verify its structure
      setHospitalData(data);
      setShowSearch(false); // Close the search modal after a successful search
    } catch (error) {
      console.error('Error fetching data for search:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md w-full relative">
        <button 
          onClick={() => {
            setShowSearch(false);
            setSearchQuery('1'); // Reset to default hospital
            setError(null);
          }}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
        <div className="mb-6">
          <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Oops! Hospital Not Found</h3>
        <p className="text-gray-600 mb-6">{error}</p>
        
        {showSearch ? (
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Hospital Partner ID"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                autoFocus
              />
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  if (searchInput.trim()) {
                    setSearchQuery(searchInput);
                    setError(null);
                    handleSearch(); // Trigger search
                  }
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
              <button 
                onClick={() => {
                  setShowSearch(false);
                  setSearchInput('');
                  setError(null);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <button 
              onClick={() => {
                setSearchQuery('1'); // Default hospital ID
                setError(null);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Default Hospital
            </button>
            <button 
              onClick={() => setShowSearch(true)}
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Try Another ID
            </button>
          </div>
        )}
      </div>
    </div>
  );

  if (!hospitalData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen w-screen bg-gray-50">
      {/* Header with Back Button and Logo */}
      <div className="relative bg-gradient-to-r from-blue-700 to-blue-500 text-white py-4">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${navbg})` }}
        ></div>
        <div className="w-full px-4 relative">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-2 sm:mb-0">
              <button
                onClick={handleBack}
                className="p-2 hover:bg-blue-600 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <h1 className="text-xl sm:text-2xl font-bold">Healthcare Claims Analytics</h1>
            </div>
            <div className="flex items-center justify-between w-full sm:w-auto">
              <div className="flex items-center w-full sm:w-auto">
                <div className="relative w-full sm:w-auto">
                  <input 
                    type="text" 
                    className="pl-4 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:w-auto text-black placeholder-left"
                    placeholder="Search by Partner ID"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <button onClick={handleSearch} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
                <img src="/dist/img/logo.png" alt="Logo" className="h-12 sm:h-16 w-auto ml-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="px-2 sm:px-4 py-4 sm:py-6">
        <HospitalHeader data={hospitalData} />
        <TimelineFilter />
        <CostClaimsEfficiency data={hospitalData} />
        <ClaimsSummaryOverview 
          data={{
            claims_summary: hospitalData.claims_summary,
            rejected_claims: hospitalData.rejected_claims
          }} 
        />
        <ErrorBoundary fallback={<p>Something went wrong with Claims Summary.</p>}>
          <ClaimsSummary data={hospitalData.claims_summary} />
        </ErrorBoundary>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <ClaimTypeTrend data={hospitalData.claim_type_trend} />
          <SimilarHospitals data={hospitalData.similar_hospitals} />
        </div>
        <div className="grid grid-cols-1 mt-4 sm:mt-6 lg:grid-cols-2 gap-4 sm:gap-6">
          <MedicalSurgicalDistribution data={hospitalData.claims_summary} />
          <ComponentTrend />
        </div>
        <div className="grid grid-cols-1 mt-4 sm:mt-6 lg:grid-cols-2 gap-4 sm:gap-6">
          <TopDiagnoses data={hospitalData.top_diagnoses} />
          <RejectedClaims data={hospitalData.rejected_claims} />
        </div>
        <div className="grid grid-cols-1 mt-4 sm:mt-6 lg:grid-cols-2 gap-4 sm:gap-6">
          <ILMFindings data={hospitalData.ilm_findings} />
          <FeedbackWidget data={hospitalData.feedback} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 