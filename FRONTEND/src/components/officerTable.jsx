import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Form, Button, Container, Modal } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
const OfficerTable = () => {
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
  
    useEffect(() => {
      fetchData();
      const intervalId = setInterval(fetchData, 5000);
      return () => clearInterval(intervalId);
    }, []);
  
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8001/userList');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    const columns = [
      { name: 'No.', selector: 'userId', sortable: true },
      { name: 'Name', selector: 'firstName', sortable: true, cell: (row) => `${row.firstName} ${row.middleName} ${row.lastName}` },
      { name: 'ID Number', selector: 'idNumber', sortable: true },
      { name: 'Date Added', selector: 'dateAdded', sortable: true, cell: (row) => formatDateAdded(row) },
      { name: 'Status', selector: 'status', sortable: true },
      { name: 'Role', selector: 'role', sortable: true },
    ];
  
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
  
    const handleOpenModal = (row) => {
      setSelectedRow(row);
    };
  
    const handleCloseModal = () => {
      setSelectedRow(null);
    };
  
    const filteredData = data.filter((row) =>
      columns.some((column) => String(row[column.selector]).toLowerCase().includes(searchText.toLowerCase()))
    );
  
    return (
      <Container className=' mt-1 p-3 '>
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
          onRowClicked={handleOpenModal}
        />
        <Modal show={!!selectedRow} centered onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Officer Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedRow && (
              <>
                <p>Name: {`${selectedRow.firstName} ${selectedRow.middleName} ${selectedRow.lastName}`}</p>
                <p>Date Added: {formatDateAdded(selectedRow)}</p>
                <p>Status: {selectedRow.status}</p>
                <p>Role: {selectedRow.role}</p>
                <p>ID Number: {selectedRow.idNumber}</p>
                <p>Temporary Password: {selectedRow.generatedPassword}</p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  };
  
  export default OfficerTable;