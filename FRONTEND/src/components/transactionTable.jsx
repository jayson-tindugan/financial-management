import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Form, Button, Container, Modal, Table } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import '../assets/css/global.css';

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

  // Helper Functions

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
      transactionVersion: row.transactionVersion
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
        minWidth: '115px',
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
        fixedHeader={true}
        fixedHeaderScrollHeight="600px"
    />
  <Modal show={showModal} onHide={handleCloseModal}>
    <Modal.Header className="container-bg2" closeButton style={{ color: 'white' }}>
      <Modal.Title>Update</Modal.Title>
    </Modal.Header>
    <Modal.Body className="container-bg2">
        {selectedRow && (
            <Form>
            <form method="submit">
              <div className='row'>
                <div className='col-md-6 my-2'>
                  <Form.Group className="mb-3" controlId="formTransactionId">
                    <Form.Label>Transaction ID:</Form.Label>
                    <Form.Control type="text" value={selectedRow.transactionId} disabled />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formParticular">
                    <Form.Label>Particular:</Form.Label>
                    <Form.Control type="text" disabled value={formValues.particular || selectedRow.particular} onChange={(e) => handleInputChange('particular', e.target.value)} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formAmount">
                    <Form.Label>Amount:</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      value={formValues.amount !== 0 ? formValues.amount : selectedRow.amount}
                      onChange={(e) => handleInputChange('amount', parseFloat(e.target.value))}
                    />
                  </Form.Group>
                  <Form.Group controlId="formTotal">
                    <Form.Label>Date:</Form.Label>
                    <Form.Control
                      type="date"
                      value={formValues.transactionDate || selectedRow.transactionDate}
                      onChange={(e) => handleInputChange('transactionDate', e.target.value)}
                    />
                  </Form.Group>
                </div>
                <div className='col-md-6 my-2'>
                  <Form.Group className="mb-3" controlId="formParticular">
                    <Form.Label>Date Encoded:</Form.Label>
                    <Form.Control type="text" disabled value={formatDateAdded(selectedRow)} onChange={(e) => handleInputChange('dateAdded', e.target.value)} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formParticular">
                    <Form.Label>OR No.:</Form.Label>
                    <Form.Control type="text" value={formValues.orNumber || selectedRow.orNumber} onChange={(e) => handleInputChange('orNumber', e.target.value)} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formQuantity">
                    <Form.Label>Quantity:</Form.Label>
                    <Form.Control
                      type="number"
                      value={formValues.quantity !== 0 ? formValues.quantity : selectedRow.quantity}
                      onChange={(e) => handleInputChange('quantity', parseFloat(e.target.value))}
                    />
                  </Form.Group>
                  <Form.Group controlId="formTotal">
                    <Form.Label>Total:</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      value={formValues.total !== 0 ? formValues.total : selectedRow.total}
                      onChange={(e) => handleInputChange('total', e.target.value)}
                    />
                  </Form.Group>
                </div>
                <Form.Group className="my-2" controlId="formRemark">
                  <Form.Label>Remark:</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={formValues.remark || selectedRow.remark}
                    onChange={(e) => handleInputChange('remark', e.target.value)}
                  />
                </Form.Group>
              </div>
            </form>
          </Form>            
        )}
        </Modal.Body>
        <Modal.Footer className="container-bg2">
        <Button variant="secondary" onClick={handleClear}>
            Clear
        </Button>
        <Button variant="success" className="button-bg" onClick={handleUpdate}>
            Update
        </Button>
        </Modal.Footer>
    </Modal>

    <Modal show={showTransactionVersionModal} onHide={handleCloseModalVer} className='modal-lg'>
    <Modal.Header className="container-bg2" closeButton style={{ color: 'white' }}>
      <Modal.Title><h5>Version History</h5></Modal.Title>
    </Modal.Header>
    <Modal.Body className="container-bg2" >
                <Form>
                {selectedRow && (
                  <div className="my-2" style={{ overflowX: 'auto', width: '100%' }}>
                    <DataTable
                      columns={[
                        { name: 'Date', selector: 'changeTime', sortable: true, minWidth: '170px', cell: (row) => new Date(row.changeTime).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }) },
                        { name: 'Amount', selector: 'amount', sortable: true, cell: (selectedRow) => (
                          <span>
                            ₱ {Number(selectedRow.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        ),
                        },
                        { name: 'Quantity', selector: 'quantity', sortable: true },
                        { name: 'Total', selector: 'total', sortable: true, cell: (selectedRow) => (
                          <span>
                            ₱ {Number(selectedRow.total).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        ),
                        },
                        { name: 'orNumber', selector: 'orNumber', sortable: true },
                        { name: 'Remark', selector: 'remark', sortable: true },
                      ]}
                      data={selectedRow.transactionVersion}
                      highlightOnHover
                      persistTableHead={true}
                      fixedHeader={true}
                      fixedHeaderScrollHeight="600px"
                    />
                  </div>
                   )}
                </Form>
            </Modal.Body>
    </Modal>

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
