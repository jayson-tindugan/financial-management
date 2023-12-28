import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Form, Button, Container, Modal } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import '../assets/css/global.css';
import TransactionUpdateModal from './transactionUpdateModal';
import TransactionVersionModal from './transactionVersionModal';

const TransactionTable = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showTransactionVersionModal, setShowTransactionVersionModal] = useState(false);
  const [formValues, setFormValues] = useState({
    amount: 0,
    quantity: 0,
    total: 0,
    remark: '',
  });

  axios.defaults.withCredentials = true;
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8001/transaction/fetchAll');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);


  // Data format Functions
  const formatTransactionDate = (row) => {
    const transactionDate = new Date(row.transactionDate);
    return transactionDate.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const formatDateAdded = (row) => {
    const dateAdded = new Date(row.dateAdded);
    return dateAdded.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  // Modal Functions
  const handleOpenModal = (row) => {
    setSelectedRow(row);
    setFormValues({
      amount: row.amount,
      quantity: row.quantity,
      total: row.total,
      remark: row.remark,
      orNumber: row.orNumber,
      dateAdded: row.dateAdded,
      transactionDate: row.transactionDate,
      transactionVersion: row.transactionVersion,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  const handleOpenTransactionVersionModal = (row) => {
    setSelectedRow(row);
    setFormValues({
      amount: row.amount,
      quantity: row.quantity,
      total: row.total,
      remark: row.remark,
      orNumber: row.orNumber,
      dateAdded: row.dateAdded,
      transactionDate: row.transactionDate,
      transactionVersion: row.transactionVersion,
    });
    setShowTransactionVersionModal(true);
  };

  const handleCloseModalVer = () => {
    setShowTransactionVersionModal(false);
  };

  const handleInputChange = (field, value) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [field]: value,
      total: (field === 'amount' ? value : prevFormValues.amount) * (field === 'quantity' ? value : prevFormValues.quantity),
    }));
  };


  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:8001/transaction/update/${selectedRow.transactionId}`, {
        amount: formValues.amount,
        quantity: formValues.quantity,
        total: formValues.total,
        remark: formValues.remark,
        orNumber: formValues.orNumber,
        transactionDate: formValues.transactionDate,
      });

      if (response.data === 'Success') {
        console.log('Update success');
        fetchData(); // Refresh data after update
        handleCloseModal();
        setShowSuccessModal(true); // Show the success modal
      } else {
        console.error('Unexpected response:', response.data);
      }
    } catch (error) {
      console.error('Error updating data:', error);
      handleCloseModal();
      setShowSuccessModal(true);
    }
  };

  const handleClear = () => {
    setFormValues({
      amount: 0,
      quantity: 0,
      total: 0,
      remark: '',
    });
    setShowSuccessModal(false);
  };

  // Render
  const columns = [
    { name: 'Transaction ID', selector: 'transactionId', sortable: true, minWidth: '137px', grow: 5 },
    { name: 'Date', selector: 'transactionDate', sortable: true, minWidth: '100px', cell: (row) => formatTransactionDate(row) },
    {
      name: 'Type',
      selector: 'transactionType',
      sortable: true,
      minWidth: '115px',
      cell: (row) => (
        <span>
          {row.transactionType === 'INFLOW' ? (
            <>
              <div className='text-success'>
                Inflow <Icon.ArrowUp />
              </div>
            </>
          ) : (
            <>
              <div className='text-danger'>
                Outflow <Icon.ArrowDown />
              </div>
            </>
          )}
        </span>
      ),
    },
    { 
        name: 'Amount', 
        selector: 'amount', 
        sortable: true,
        cell: (row) => (
          <span>
            ₱ {Number(row.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        ),
      },
      { name: 'Quantity', selector: 'quantity', sortable: true },
      { 
        name: 'Total', 
        selector: 'total', 
        sortable: true,
        minWidth: '130px',
        cell: (row) => (
          <span>
            ₱ {Number(row.total).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        ),
    },
    { name: 'Particular', selector: 'particular', sortable: true, minWidth: '160px', grow: 5 },
    { name: 'OR No.', selector: 'orNumber', sortable: true },
    { name: 'Remark', selector: 'remark', sortable: true, minWidth: '150px', grow: 5 },
    {
      name: 'Action',
      selector: 'actionModal',
      sortable: false,
      minWidth: '50px',
      grow: 5,
      cell: (row) => (
        <>
          <Button variant='link' size='sm' onClick={() => handleOpenTransactionVersionModal(row)}>
            <Icon.ClockHistory variant='dark'/>
          </Button>
          <Button variant='link' size='sm' onClick={() => handleOpenModal(row)}>
            <Icon.Pencil color='green' />
          </Button>
        </>
      ),
    },
  ];

  const filteredData = data.filter((row) =>
    columns.some((column) => String(row[column.selector]).toLowerCase().includes(searchText.toLowerCase()))
  );

  return (
    <Container className='form-container mt-1 p-3 pt-4 rounded-4 container-bg'>
      <h4 className='d-flex justify-content-center'>Breakdown of Cash Inflows and Outflows</h4>
      <Form.Group controlId='search' className='my-3'>
        <Form.Control type='text' placeholder='Search...' value={searchText} onChange={(e) => setSearchText(e.target.value)} />
      </Form.Group>
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        paginationPerPage={10}
        highlightOnHover
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
        persistTableHead={true}
      />
      <TransactionUpdateModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleClear={handleClear}
        handleUpdate={handleUpdate}
        formValues={formValues}
        selectedRow={selectedRow}
        handleInputChange={handleInputChange}
        formatDateAdded={formatDateAdded}
      />
      <TransactionVersionModal
        showTransactionVersionModal={showTransactionVersionModal}
        handleCloseModalVer={handleCloseModalVer}
        selectedRow={selectedRow}
      />
      <Modal show={showSuccessModal} centered onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3 className="d-flex justify-content-center" style={{ color: 'green' }}>
            Success <Icon.Check2Circle />
          </h3>
          <p className="d-flex justify-content-center">Transaction has been updated successfully.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSuccessModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TransactionTable;
