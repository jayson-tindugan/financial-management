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
  
  const collection = cashflowData.find(item => item.allocationType === 'COLLECTION')?.netProfitLoss || 0;
  const donation = cashflowData.find(item => item.allocationType === 'DONATION')?.netProfitLoss || 0;
  const igp = cashflowData.find(item => item.allocationType === 'IGP')?.netProfitLoss || 0;
  let collectionCount = Number(collection).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  let donationCount = Number(donation).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  let igpCount = Number(igp).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return { collectionCount, donationCount, igpCount };
};



