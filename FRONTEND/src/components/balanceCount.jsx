import { useEffect, useState } from 'react';
import axios from 'axios';

const BalanceCount = () => {
  const [cashflowData, setCashflowData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8001/transaction/totalCashflow');
        setCashflowData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
    </div>
  );
};

export const getBalanceCounts = async () => {
  const response = await axios.get('http://localhost:8001/transaction/totalCashflow');
  const cashflowData = response.data;
  
  const collectionCount = cashflowData.find(item => item.allocationType === 'COLLECTION')?.netProfitLoss || 0;
  const donationCount = cashflowData.find(item => item.allocationType === 'DONATION')?.netProfitLoss || 0;
  const igpCount = cashflowData.find(item => item.allocationType === 'IGP')?.netProfitLoss || 0;

  return { collectionCount, donationCount, igpCount };
};



