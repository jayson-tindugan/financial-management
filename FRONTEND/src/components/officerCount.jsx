import { useEffect, useState } from 'react';
import axios from 'axios';

const OfficerCount = () => {
  const [officerCount, setOfficerCount] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get('http://localhost:8001/officerCount');
        setOfficerCount(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 
  console.log(officerCount);
  return (
    <div>
      {officerCount !== null ? (
       <p>{officerCount}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default OfficerCount;
