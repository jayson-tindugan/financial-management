import React from 'react';
import { Modal, Form } from 'react-bootstrap';
import DataTable from 'react-data-table-component';

const TransactionVersionModal = ({ showTransactionVersionModal, handleCloseModalVer, selectedRow }) => {
  return (
    <Modal show={showTransactionVersionModal} onHide={handleCloseModalVer} className='modal-lg'>
      <Modal.Header className="container-bg2" closeButton style={{ color: 'white' }}>
        <Modal.Title><h5>Version History</h5></Modal.Title>
      </Modal.Header>
      <Modal.Body className="container-bg2">
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
  );
};

export default TransactionVersionModal;
