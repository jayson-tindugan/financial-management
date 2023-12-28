import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

const TransactionUpdateModal = ({
  showModal,
  handleCloseModal,
  handleClear,
  handleUpdate,
  formValues,
  selectedRow,
  handleInputChange,
  formatDateAdded,
}) => {
  return (
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
  );
};

export default TransactionUpdateModal;
