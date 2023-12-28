import React, { useState } from 'react';
import { Button, Form, Modal, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import * as Icon from 'react-bootstrap-icons';


const OfficerAddModal = ({ onAddOfficer }) => {
    const [show, setShow] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
  
    const [formData, setFormData] = useState({
      idNumber: '',
      firstName: '',
      middleName: '',
      lastName: '',
      role: '',
      status:'ACTIVE',
      password: '',
      generatedPassword: ' ',
    });
  
    const handleInputChange = (field, value) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [field]: value,
      }));
    };
  
    const handleGeneratePassword = () => {
      const generatedPassword = Math.random().toString(36).substring(2, 10);
      setFormData((prevFormData) => ({
        ...prevFormData,
        password: generatedPassword,
        generatedPassword: generatedPassword,
        status:'ACTIVE'
      }));
    };
  
    const handleTogglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };
  
    const handleAddOfficer = async () => {
        if (
            formData.idNumber === '' ||
            formData.firstName === '' ||
            formData.middleName === '' ||
            formData.lastName === '' ||
            formData.role === '' ||
            formData.password === ''
        ) {
            alert('Please fill in all required fields.');
            return;
        }
        axios.defaults.withCredentials = true;
        try {
          const response = await axios.post('http://localhost:8001/register', formData);
      
          if (response.data === 'Registered successfully!') {
            console.log('Officer added successfully');
            handleClose();
            setShowSuccessModal(true);
            onAddOfficer(); 
          }
          if (response.data === 'ID number already exists') {
            alert('ID number already exists');
          }
         
        } catch (error) {
          console.error('Error adding officer:', error);
        }
      };
  
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setFormData({
          idNumber: '',
          firstName: '',
          middleName: '',
          lastName: '',
          role: '',
          status: 'ACTIVE',
          password: '',
          generatedPassword: ' ',
        });
      };
    
    const handleSuccessModalClose = () => setShowSuccessModal(false);
  
    return (
      <>
        <Button variant="success" onClick={handleShow}>
          Add Officer
        </Button>
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add Officer</Modal.Title>
          </Modal.Header>
  
          {/* Form Inside the MODAL */}
          <Form style={{ padding: '20px' }}>
            <Form.Group className="">
              <Form.Label>Student Number:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Student Number"
                value={formData.idNumber}
                onChange={(e) => handleInputChange('idNumber', e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="">
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="">
              <Form.Label>Middle Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Middle Name"
                value={formData.middleName}
                onChange={(e) => handleInputChange('middleName', e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="">
              <Form.Label>Role:</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => handleInputChange('role', e.target.value)}
                required
              >
                <option value="" disabled selected>
                  Select Role
                </option>
                <option value="TREASURER">Treasurer</option>
                <option value="AUDITOR">Auditor</option>
                <option value="OFFICER">Officer</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="">
              <Form.Label>Password:</Form.Label>
              <InputGroup>
                <FormControl
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                />
                <FormControl
                  type="hidden"
                  value={formData.generatedPassword}
                />
                <Button variant="outline-secondary" onClick={handleTogglePasswordVisibility}>
                  {passwordVisible ? 'Hide' : 'Show'}
                </Button>
              </InputGroup>
            </Form.Group>
            <div className='d-flex justify-content-center py-2'>
              <Button variant="secondary" onClick={handleGeneratePassword}>
                Generate Password
              </Button>
            </div>
          </Form>
  
          <Modal.Footer>
            <Button variant="light" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success" onClick={handleAddOfficer}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
  
        {/* Success Modal */}
        <Modal show={showSuccessModal} onHide={handleSuccessModalClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3 className="d-flex justify-content-center" style={{ color: 'green' }}>
              Success <Icon.Check2Circle />
            </h3>
            <p className="d-flex justify-content-center">Officer added successfully.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleSuccessModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
  
  export default OfficerAddModal;
  