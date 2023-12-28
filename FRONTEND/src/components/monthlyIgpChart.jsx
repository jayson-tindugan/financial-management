import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import * as Icon from 'react-bootstrap-icons';

import "bootstrap/dist/css/bootstrap.min.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  scales:{
    x: {
      ticks: {
          color: '#62735e'
      },
  },
 y: {
    ticks: {
        color: '#62735e'
    },
}
},
responsive: true,
plugins: {
   legend: {
    labels: {
        color: '#62735e'
        }
    },
  title: {
    display: true,
    text: 'Monthly IGP Cashflow',
    color: '#536150', 
  },

}
};

const MonthlyIgpChart = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.get('http://localhost:8001/transaction/monthlyIgp');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.response?.data.message || 'Unknown error');
      setData({ error: 'Error fetching data. Please try again later.' });
    }
  };

  useEffect(() => {
    fetchData(); // Initial data fetch

    // Fetch data every 5 seconds (adjust the interval as needed)
    const intervalId = setInterval(fetchData, 5000);

    // Cleanup function to clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);  

  if (!data) {
    return <div>Loading...</div>;
  }

  if ('error' in data) {
    return <div>{data.error}</div>;
  }

  if (!Array.isArray(data) || data.length === 0) {
    return <>
    <div className='fw-bold text-black-50 my-4 py-5  d-flex justify-content-center'> 
        No chart data available
    </div>
    </>;
  }

  const chartData = {
    labels: data.map(entry => entry.month),
    datasets: [
      {
        label: 'Total Inflows',
        data: data.map(entry => entry.cashInflows),
        backgroundColor: 'rgba(60, 179, 113, 0.5)', // Green color
      },
      {
        label: 'Total Outflows',
        data: data.map(entry => entry.cashOutflows),
        backgroundColor: 'rgba(128, 128, 0, 0.5)', // Olive color
      },
      {
        label: 'Cash on Hands',
        data: data.map(entry => entry.cashOnHands),
        backgroundColor: 'rgba(107, 142, 35, 0.5)', // Olive Green color
      },
    ],
  };

  return (
    <div>
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default MonthlyIgpChart;
