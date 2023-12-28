import React, { useState, useEffect } from 'react';
import { 
  Form, 
  Button, 
  Container, 
  Row, 
  Col, 
  Modal 
} from 'react-bootstrap';
import '../assets/css/global.css';
import axios from 'axios';
import session from '../components/session.jsx';
import * as Icon from 'react-bootstrap-icons';

const TransactionForm = () => {
  const [transactionType, setTransactionType] = useState('');
  const [allocationType, setAllocationType] = useState('');
  let [particular, setParticular] = useState('');
  let [orNumber, setOrNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [quantity, setQuantity] = useState('');
  const [total, setTotal] = useState('');
  const [remark, setRemark] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const toggleFields = () => {
    setParticular('');
    setOrNumber('');
  };

  const handleModalClose = () => {
    setShowModal(false);
    clearForm();
  };

  const handleModalShow = () => setShowModal(true);

  const updateTotal = () => {
    const amountValue = parseFloat(amount) || 0;
    const quantityValue = parseFloat(quantity) || 0;
    const totalValue = amountValue * quantityValue;
    setTotal(totalValue.toFixed(2));
  };

  useEffect(() => {
    updateTotal();
  }, [amount, quantity]);

  const handleAmountChange = (e) => {
    const inputValue = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(inputValue)) {
      setAmount(inputValue);
    }
  };

  const handleQuantityChange = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      setQuantity(inputValue);
    }
  };

  const clearForm = () => {
    setTransactionType('');
    setAllocationType('');
    toggleFields();
    setAmount('');
    setQuantity('');
    setTotal('');
    setRemark('');
  };

  const isAuthenticated = session();
  console.log(isAuthenticated);

  async function submitForm(event) {
    event.preventDefault();
    axios.defaults.withCredentials = true;

    try {
      if (transactionType === 'INFLOW') {
        particular = allocationType+' RECEIVED'; 
        orNumber = 'N/A';
      }
      const response = await axios.post('http://localhost:8001/transaction/save', {
        transactionDate: transactionDate,
        transactionType: transactionType,
        allocationType: allocationType,
        amount: amount,
        quantity: quantity,
        total: total,
        remark: remark,
        particular: particular,
        orNumber: orNumber
      });

      if (response.data === 'Success') {
        console.log('Success');
        handleModalShow();
      } else {
        console.error('Unexpected response:', response.data);
        setErrorMessage('Unexpected response from the server');
      }
    } catch (error) {
      if (error.response) {
        console.error('Server responded with an error status:', error.response.status);
        setErrorMessage('Error: ' + (error.response.data.message || 'Unknown error'));
      } 
      if (error.request) {
        console.error('No response received from the server');
        setErrorMessage('No response received from the server');
      } else {
        console.error('Error setting up the request:', error.message);
        setErrorMessage('Error setting up the request');
      }
    }
  };

  return (
    <Container className="form-container mt-1 p-4 rounded-4 container-bg">
      <h4 className="d-flex justify-content-center mb-3">Transaction Form</h4>
      <Form>
        <form method="POST">
          <Row className="mb-3">
            <Col sm={6}>
              <Form.Label>Transaction Type:</Form.Label>
              <Form.Select
                value={transactionType}
                id="transactionType"
                name="transactionType"
                onChange={(e) => {
                  setTransactionType(e.target.value);
                  toggleFields();
                }}
              >
                <option value="" disabled>Select..</option>
                <option value="INFLOW">Inflow</option>
                <option value="OUTFLOW">Outflow</option>
              </Form.Select>
            </Col>
            <Col sm={6}>
              <Form.Label>Allocation Type:</Form.Label>
              <Form.Select
                value={allocationType}
                onChange={(e) => setAllocationType(e.target.value)}
              >
                <option value="" disabled>Select..</option>
                <option value="COLLECTION">Collection</option>
                <option value="IGP">IGP</option>
                <option value="DONATION">Donation</option>
              </Form.Select>
            </Col>
          </Row>

          {transactionType === 'OUTFLOW' && (
            <>
              <Row className="mb-3">
                <Col sm={6}>
                  <Form.Label>Particular:</Form.Label>
                  <Form.Select
                    value={particular}
                    onChange={(e) => setParticular(e.target.value)}
                    required
                  >
                     <option value="" disabled>Select..</option>
                      <option value="FOOD EXPENSE">Food Expense</option>
                      <option value="SUPPLIES EXPENSE">Supplies Expense</option>
                      <option value="TRANSPORTATION EXPENSE">Transportation Expense</option>
                      <option value="RENT EXPENSE">Rent Expense</option>
                      <option value="REPRESENTATION EXPENSE">Representation Expense</option>
                      <option value="MEDICAL EXPENSE">Medical Expense</option>
                      <option value="COMMUNICATION EXPENSE">Communication Expense</option>
                      <option value="MISCELLANEOUS EXPENSE">Miscellaneous Expense</option>
                      <option value="TOKEN EXPENSE">Token Expense</option>
                  </Form.Select>
                </Col>
                <Col sm={6}>
                  <Form.Label>OR No.:</Form.Label>
                  <Form.Control
                    type="text"
                    id="orNumber"
                    value={orNumber}
                    onChange={(e) => setOrNumber(e.target.value)}
                    required
                  />
                </Col>
              </Row>
            </>
          )}

          <Row className="mb-3">
            <Col sm={6}>
              <Form.Label>Amount:</Form.Label>
              <Form.Control
                type="text"
                id="amount"
                value={amount}
                pattern="^\d+(\.\d{1,2})?$"
                required
                onChange={handleAmountChange}
              />
            </Col>
            <Col sm={6}>
              <Form.Label>Quantity:</Form.Label>
              <Form.Control
                type="text"
                id="quantity"
                value={quantity}
                pattern="^\d+$"
                onChange={handleQuantityChange}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col sm={6}>
              <Form.Label>Total:</Form.Label>
              <Form.Control type="text" id="total" value={total} readOnly />
            </Col>
            <Col sm={6}>
              <Form.Label>Date:</Form.Label>
              <Form.Control type="date" id="transactionDate" value={transactionDate} 
              onChange={(e) => setTransactionDate(e.target.value)} required />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col sm={12}>
              <Form.Label>Remark:</Form.Label>
              <Form.Control
                as="textarea"
                id="remark"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                required
              />
            </Col>
          </Row>

          <Row className="mt-2">
            <Col sm={12} className="d-flex justify-content-end">
              <div>
                <Button className="mx-2" variant="secondary" onClick={clearForm}>
                  Clear
                </Button>
                <Button variant="success" className="button-bg" onClick={submitForm}>
                  Submit
                </Button>
              </div>
            </Col>
          </Row>
        </form>
      </Form>
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
           
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h3 className="d-flex justify-content-center" style={{ color: 'green' }}>
              Success <Icon.Check2Circle />
            </h3>
          <p className="d-flex justify-content-center">Transaction has been submitted successfully.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TransactionForm;
