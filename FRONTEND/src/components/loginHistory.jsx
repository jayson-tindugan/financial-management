import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table } from 'react-bootstrap';

const LoginHistory = () => {
  const [loginHistory, setLoginHistory] = useState([]);

  useEffect(() => {
    axios.defaults.withCredentials = true;

    const fetchLoginHistory = async () => {
      try {
        const response = await axios.get('http://localhost:8001/loginHistory');
        setLoginHistory(response.data);
      } catch (error) {
        console.error('Error fetching login history:', error);
      }
    };

    fetchLoginHistory();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <Container>
      <div className='d-flex justify-content-center mb-2'>
        <b className='text-dark-50'>Login History</b>
      </div>
      <Container className="mt-3" style={{ height: '275px', overflowY: 'auto' }}>
      <Table striped hover>
       
        <tbody>
          {loginHistory.map((entry) => (
            <tr key={entry.id}>
              <td>{formatDate(entry.logDate)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      </Container>
    </Container>
  );
};

export default LoginHistory;
