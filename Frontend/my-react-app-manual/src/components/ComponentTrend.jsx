import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { PieChart } from 'lucide-react';

const ComponentTrend = () => {
  const [state, setState] = useState({
    series: [],
    options: {
      chart: {
        type: 'area',
        stacked: false,
        height: 350,
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          if (val >= 100000) {
            return (val / 100000).toFixed(1) + 'L';
          } else {
            return (val / 1000).toFixed(0) + 'k';
          }
        },
        style: {
          colors: ['#000'],
          fontSize: '10px',
          fontWeight: 'bold',
        }
      },
      markers: {
        size: 4,
      },
      stroke: {
        width: 2,
        curve: 'smooth',
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            if (val >= 100000) {
              return (val / 100000).toFixed(1) + 'L';
            } else {
              return (val / 1000).toFixed(0) + 'k';
            }
          },
        },
        title: {
          text: 'Price'
        },
      },
      xaxis: {
        categories: [],
        type: 'category',
        title: {
          text: 'Year'
        }
      },
      tooltip: {
        shared: true,
        y: {
          formatter: function (val) {
            if (val >= 100000) {
              return (val / 100000).toFixed(1) + 'L';
            } else {
              return (val / 1000).toFixed(0) + 'k';
            }
          }
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3000/hospitals/1');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setState(prevState => ({
          ...prevState,
          series: data.component_trend.series,
          options: {
            ...prevState.options,
            xaxis: {
              ...prevState.options.xaxis,
              categories: data.component_trend.categories
            }
          }
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg sm:text-xl font-medium text-gray-800 flex items-center">
        <PieChart className="w-5 h-5 mr-2 text-[#1261A0]" />
        Component Trend
      </h3>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <ReactApexChart options={state.options} series={state.series} type="area" height={350} />
      </div>
    </div>
  );
};

export default ComponentTrend; 