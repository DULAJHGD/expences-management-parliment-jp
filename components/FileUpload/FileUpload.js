import React, { useState } from 'react';
import { Row, Col, Card, CardHeader, CardBody, CardTitle, Table, Modal, ModalBody, ModalHeader, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

function FileUpload() { // Removed 'tableData' from props
  const [file, setFile] = useState(null);
  const [tableData, setTableData] = useState([]); // Declare tableData state here
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();

  const handleRowSelect = (row) => {
    if (selectedRows.includes(row)) {
      setSelectedRows(selectedRows.filter((selectedRow) => selectedRow !== row));
    } else {
      setSelectedRows([...selectedRows, row]);
    }
  };

  const handleSubmit = () => {
    // Navigate to another page with selected data
    navigate("/confirm-expenses", { state: { selectedData: selectedRows } });
  };

  const parseCSV = (csvText) => {
    // Log CSV content for debugging
    console.log('CSV Content:', csvText);

    // Split CSV text by lines
    const rows = csvText.split('\n').filter(row => row.trim());
    console.log('Parsed Rows:', rows);

    const parsedData = rows.slice(1).map((row) => { // Skip header
      const columns = row.split(',');
      return {
        date: columns[0],
        payee: columns[1],
        details: columns[4],
        amount: columns[3],
      };
    });
    console.log('Parsed Data:', parsedData);
    return parsedData;
  };

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      const data = parseCSV(content);
      setTableData(data); // Use local state for tableData
      setModalOpen(true);
    };
    reader.onerror = (error) => {
      console.error('File reading error:', error);
    };
    reader.readAsText(uploadedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      const data = parseCSV(content);
      setTableData(data); // Use local state for tableData
      setModalOpen(true);
    };
    reader.onerror = (error) => {
      console.error('File reading error:', error);
    };
    reader.readAsText(droppedFile);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div>
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <h5 className="title">Upload Expenses</h5>
            </CardHeader>
            <CardBody>
              <Col md="12">
                <Card className="card-user">
                  <CardBody>
                    <div
                      className="author"
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      <div className="block block-one" />
                      <div className="block block-two" />
                      <div className="block block-three" />
                      <div className="block block-four" />

                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
                          <img
                             alt="..."
                            className="avatar"
                            src={require("assets/img/file.png")}
                          />
                          <h5 className="title">
                            Click on the Icon or Drag and Drop a CSV File
                          </h5>
                        </label>
                      </a>
                      <input
                        id="fileInput"
                        type="file"
                        accept=".csv"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                      <p className="description">
                        The file will be processed by AI for expenses data.
                      </p>
                    </div>
                    <div className="description">
                      Accepted file type: CSV.
                    </div>
                    {file && <div className="file-info">Selected File: {file.name}</div>}
                  </CardBody>
                </Card>
              </Col>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Modal to display file data in a table */}
      <Modal 
        isOpen={modalOpen} 
        toggle={toggleModal} 
        centered 
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: '80%', width: '80%', height: '100%' }}
      >
        <ModalHeader toggle={toggleModal}>
          Total Expenses List for {file?.name}
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Total Expenses List</CardTitle>
            </CardHeader>
            <CardBody>
              <Table className="tablesorter" responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Select</th>
                    <th>Date</th>
                    <th>Payee</th>
                    <th>Details</th>
                    <th className="text-center">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.length > 0 ? (
                    tableData.map((row, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(row)}
                            onChange={() => handleRowSelect(row)}
                          />
                        </td>
                        <td>{row.date}</td>
                        <td>{row.payee}</td>
                        <td>{row.details}</td>
                        <td className="text-center">{row.amount}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
              <Button
                color="primary"
                disabled={selectedRows.length === 0}
                onClick={handleSubmit}
              >
                Submit Selected
              </Button>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default FileUpload;
