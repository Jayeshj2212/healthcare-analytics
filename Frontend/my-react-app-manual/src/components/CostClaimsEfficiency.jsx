import React, { useState, Fragment } from 'react';
import { BarChart } from 'lucide-react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import Chart from 'react-apexcharts';
import { AgGauge } from "ag-charts-react";
import "ag-charts-enterprise";

// Define ACSGauge as a separate component
const ACSGauge = ({ totalAcs }) => {
  const acsValue = totalAcs || 0;

  const maxScaleValue = 100000; // Set the maximum scale to accommodate the ACS value
  const [options, setOptions] = useState({
    type: "linear-gauge",
    direction: "horizontal",
    value: (acsValue / maxScaleValue) * 100, // Calculate the gauge value as a percentage of the max scale
    scale: {
      min: 0,
      max: 100,
      interval: {
        values: [0, 20, 40, 60, 80, 100], // Map these to 1K, 20K...100 => ''
      },
      label: {
        enabled: true,
        formatter: ({ value }) => {
          if (value === 100) return "";     // Hide label for 100
          if (value === 5) return "0";     // Map 5 to 1K
          return `${value}K`;              // Others: 20 => 20K, etc.
        },
      },
    },
    segmentation: {
      enabled: true,  
      interval: {
        values: [20, 40, 60, 80], // Set specific intervals for the scale
      },
      spacing: 2,
    },
  });

  const riskLevel = "HIGH RISK"; // Example risk level
  const riskColor = riskLevel === "HIGH RISK" ? "bg-red-500" : riskLevel === "MODERATE" ? "bg-yellow-500" : "bg-green-500";

  return (
    <Fragment>
      <div className="text-center mb-3 mt-10">
        <Typography variant="h6" className="font-bold">
          Current ACS: ₹{acsValue.toLocaleString()}
        </Typography>
      </div>
      <AgGauge options={options} />
      <div className="text-center mt-4">
        <button className={`px-4 py-2 rounded-full text-white ${riskColor}`}>
          {riskLevel}
        </button>
        <Typography variant="body2" className="font-medium mt-2">
          Top 25%
        </Typography>
        <Typography variant="body2" className="font-medium">
          Above network average
        </Typography>
      </div>
    </Fragment>
  );
};

const CostClaimsEfficiency = ({ data }) => {
  // Log the entire data object to verify its structure
  console.log('Data received by CostClaimsEfficiency:', data);

  // Use optional chaining to safely access the data
  const claimsSummary = data?.claims_summary;
  const averageClaimSizeInflationTrend = claimsSummary?.average_claim_size_inflation_trend;

  // Log the claims_summary and average_claim_size_inflation_trend to verify their structure
  console.log('Claims Summary:', claimsSummary);
  console.log('Average Claim Size Inflation Trend:', averageClaimSizeInflationTrend);

  // Check if averageClaimSizeInflationTrend is undefined
  if (!averageClaimSizeInflationTrend) {
    console.error('average_claim_size_inflation_trend is undefined');
  }

  const chartConfig = {
    type: "line",
    height: 240,
    series: [
      {
        name: "ACS",
        data: averageClaimSizeInflationTrend?.data || [], // Use optional chaining and default to an empty array
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#4B0082'],
          fontSize: '12px',
          fontWeight: 'bold',
        },
      },
      colors: ["#28a745"],
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 5,
      },
      xaxis: {
        categories: averageClaimSizeInflationTrend?.categories || [], // Use optional chaining and default to an empty array
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#4B0082",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        axes: [
          {
            type: "category",
            position: "bottom",
            label: {
              formatter: (params) => {
                return `₹${(params.value / 1000).toFixed(0)}K`;
              },
            },
          },
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#4B0082",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
        y: {
          formatter: (val) => `${val}%`,
        },
      },
    },
  };

  // Calculate the average inflation rate
  const calculateInflationRate = (data) => {
    const rates = [];
    for (let i = 1; i < data.length; i++) {
      const rate = ((data[i] - data[i - 1]) / data[i - 1]) * 100;
      rates.push(rate);
    }
    return rates;
  };

  const inflationRates = calculateInflationRate(chartConfig.series[0].data);
  const averageInflationRate = (inflationRates.reduce((a, b) => a + b, 0) / inflationRates.length).toFixed(2);

  // Ensure total_acs is defined
  const totalAcs = claimsSummary?.total_acs || 0;

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - ACS Inflation Trend */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h2 className="text-lg sm:text-xl font-medium text-gray-800 flex items-center">
            <BarChart className="w-5 h-5 mr-2 text-[#1261A0]" />
            Average Claim Size Inflation Trend
          </h2>
          <div className="mt-6 text-center">
            <Typography
              variant="small"
              color="gray"
              className="font-normal"
            >
              The average inflation rate across the years is <span className="text-red-500">{averageInflationRate}%</span>.
            </Typography>
          </div>
          <CardContent className="px-2 pb-0">
            <Chart {...chartConfig} />
          </CardContent>
          <Typography
            variant="small"
            color="gray"
            className="max-w-sm font-normal"
          >
            Visualize the yearly ACS (Average Cost Size) and its percentage increase over the last 5 years.
          </Typography>
        </div>

        {/* Right Column - Average Claim Size (ACS) Benchmark */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <h2 className="text-lg sm:text-xl font-medium text-gray-800 flex items-center">
            <Square3Stack3DIcon className="w-5 h-5 mr-2 text-[#1261A0]" />
            Average Claim Size ACS Benchmark
          </h2>
          <ACSGauge totalAcs={totalAcs} />
        </div>
      </div>
    </div>
  );
};

export default CostClaimsEfficiency;