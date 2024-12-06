import React ,{useState} from 'react'
import { useLocation } from 'react-router-dom';
import Sidebar from 'components/Sidebar/Sidebar';
import routes from 'routes';
import AdminNavbar from 'components/Navbars/AdminNavbar';
import { useNavigate } from 'react-router-dom';
import TablePagination from '@mui/material/TablePagination';
import {
  CardHeader,
  CardTitle,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Row,
  Col,
  Card,
  Table,
  CardBody,
  Button
} from "reactstrap";

// Table Pagination Actions
import TablePaginationActions from '../TablePagenation/TablePaginationActions';


function AddEvidance() {

    const initialRows = [
        { date: '2023-09-10', type: 'Telephone', eid: '2309105875', tamount: 500000, precentage: 10, ramount: 50000, evidence: null },
        { date: '2023-09-02', type: 'Travel', eid: '2309105871', tamount: 40000, precentage: 20, ramount: 8000, evidence: null },
        { date: '2023-09-11', type: 'Food', eid: '2309105878', tamount: 600000, precentage: 5, ramount: 30000, evidence: null },
        { date: '2023-09-05', type: 'Telephone', eid: '2309105885', tamount: 350000, precentage: 15, ramount: 52500, evidence: null },
        { date: '2023-09-16', type: 'Salary', eid: '2309105815', tamount: 600000, precentage: 10, ramount: 60000, evidence: null },
        { date: '2023-09-12', type: 'Stationary', eid: '2309105864', tamount: 450000, precentage: 8, ramount: 36000, evidence: null },
        { date: '2023-09-09', type: 'Travel', eid: '2309105823', tamount: 3500000, precentage: 12, ramount: 420000, evidence: null },
        { date: '2023-09-18', type: 'Transport', eid: '2309105889', tamount: 6800000, precentage: 25, ramount: 1700000, evidence: null },
        { date: '2023-09-17', type: 'Other', eid: '2309105875', tamount: 875000, precentage: 18, ramount: 157500, evidence: null },
      ];
    
      const [page, setPage] = useState(0);
      const [rowsPerPage, setRowsPerPage] = useState(5);
      const [sortedRows, setSortedRows] = useState([...initialRows]); // State for sorted rows
      const [sortOrder, setSortOrder] = useState('asc'); // Manage sort order (asc/desc)
      const [modal, setModal] = useState(false); // Modal state
      const [selectedRowIndex, setSelectedRowIndex] = useState(null); // To track which row is selected for uploading evidence
    
      // Toggle the modal
      const toggleModal = () => setModal(!modal);
    
      const handleFileUpload = (index, file) => {
        const updatedRows = sortedRows.map((row, rowIndex) => {
          if (rowIndex === index) {
            return { ...row, evidence: file }; // Store the uploaded evidence (file) in the row
          }
          return row;
        });
        setSortedRows(updatedRows); // Update the rows state
        setSelectedRowIndex(null); // Reset selected row index
      };
    
      const handleRemoveEvidence = (index) => {
        const updatedRows = sortedRows.map((row, rowIndex) => {
          if (rowIndex === index) {
            return { ...row, evidence: null }; // Remove evidence from the row
          }
          return row;
        });
        setSortedRows(updatedRows); // Update the rows state
      };
    
      const handleSubmitEvidence = async (index) => {
        try {
          const row = sortedRows[index];
          // Replace this URL with your actual API endpoint
          const response = await fetch('https://nat-api-endpoint/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              date: row.date,
              type: row.type,
              eid: row.eid,
              tamount: row.tamount,
              precentage: row.precentage,
              ramount: row.ramount,
              evidence: row.evidence, // Adjust this as necessary
            }),
          });
    
          if (response.ok) {
            // Remove the submitted row from the table
            const updatedRows = sortedRows.filter((_, rowIndex) => rowIndex !== index);
            setSortedRows(updatedRows);
            alert('Evidence submitted successfully!');
          } else {
            alert('Failed to submit evidence.');
          }
        } catch (error) {
    
          const updatedRows = sortedRows.filter((_, rowIndex) => rowIndex !== index);
            setSortedRows(updatedRows);
            alert('Evidence submitted successfully!');
    
          // console.error('Error submitting evidence:', error);
          // alert('An error occurred while submitting evidence.');
        }
      };
    
      // Avoid a layout jump when reaching the last page with empty rows.
      const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sortedRows.length) : 0;
    
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
    
      // Handle sorting by date
      const handleSortByDate = () => {
        const sorted = [...sortedRows].sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });
        setSortedRows(sorted); // Update sortedRows state
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sort order
      };
    
      // Handle editing the percentage and updating the requested amount
      const handlePrecentageChange = (index, newPrecentage) => {
        const updatedRows = sortedRows.map((row, rowIndex) => {
          if (rowIndex === index) {
            const updatedPrecentage = parseFloat(newPrecentage) || 0; // Ensure valid number
            const updatedRamount = (updatedPrecentage / 100) * row.tamount;
            return { ...row, precentage: updatedPrecentage, ramount: updatedRamount };
          }
          return row;
        });
        setSortedRows(updatedRows);
      };
    

    const location = useLocation();
    const mainPanelRef = React.useRef(null);
    const [sidebarOpened, setsidebarOpened] = React.useState(
        document.documentElement.className.indexOf("nav-open") !== -1
      );
  
      const toggleSidebar = () => {
        document.documentElement.classList.toggle("nav-open");
        setsidebarOpened(!sidebarOpened);
      };
  
      const getBrandText = (path) => {
        for (let i = 0; i < routes.length; i++) {
          if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
            return routes[i].name;
          }
        }
        return "Add Evidance";
      };


       // Handle opening the modal and selecting row
        const handleAttachEvidenceClick = (index) => {
            setSelectedRowIndex(index);
            toggleModal();
        };

        const handleUseCamera = () => {
            alert("Camera functionality would be here. (Using device camera via getUserMedia)");
            toggleModal(); // Close modal after action
          };

  return (
    <>
        <Sidebar
        routes={routes}
        toggleSidebar={toggleSidebar}
        logo={{
            text: "Creative Tim",
        }}
        />
        <div className="main-panel" ref={mainPanelRef}>
        <AdminNavbar
            brandText={getBrandText(location.pathname)}
            toggleSidebar={toggleSidebar}
            sidebarOpened={sidebarOpened}
        />
        
            <div className="content">
                <CardHeader>Add the Evidence from here</CardHeader>
                <Col md="12">
                    <Card>
                    <CardHeader>
                        <CardTitle tag="h4">Pending Expenses list</CardTitle>
                    </CardHeader>
                    <CardBody>
                    <Table className="tablesorter">
                    <thead className="text-primary">
                        <tr>
                        <th
                            className="text-center"
                            onClick={handleSortByDate}
                            style={{ cursor: 'pointer' }}
                        >
                            Date {sortOrder === 'asc' ? '▲' : '▼'}
                        </th>
                        <th>Type of Expense</th>
                        <th>Expense ID</th>
                        <th className="text-center">Total Amount</th>
                        <th className="text-center">Percentage</th>
                        <th className="text-center">Requested Amount</th>
                        <th className="text-center">Evidence</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(rowsPerPage > 0
                        ? sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : sortedRows
                        ).map((row, index) => (
                        <tr key={index}>
                            <td className="text-center">
                            {new Date(row.date).toLocaleDateString()}
                            </td>
                            <td>{row.type}</td>
                            <td>{row.eid}</td>
                            <td className="text-center">
                            {row.tamount?.toLocaleString()}
                            </td>
                            <td className="text-center">
                            <input
                                type="number"
                                value={row.precentage}
                                onChange={(e) =>
                                handlePrecentageChange(index, e.target.value)
                                }
                                style={{ width: '60px', textAlign: 'center' }}
                            />
                            </td>
                            <td className="text-center">
                            {row.ramount?.toLocaleString()}
                            </td>
                            <td className="text-center">
                            {row.evidence ? (
                                <>
                                <Button
                                    color="success"
                                    onClick={() => handleSubmitEvidence(index)}
                                >
                                    Submit
                                </Button>{' '}
                                <Button
                                    color="danger"
                                    onClick={() => handleRemoveEvidence(index)}
                                >
                                    Remove
                                </Button>
                                </>
                            ) : (
                                <>
                                <Button
                                    block
                                    color="primary"
                                    onClick={() => {
                                    setSelectedRowIndex(index);
                                    toggleModal();
                                    }}
                                >
                                    <i className="tim-icons icon-attach-87" />
                                </Button>
                                <input
                                    type="file"
                                    id={`file-upload-${index}`}
                                    style={{ display: 'none' }}
                                    onChange={(e) => handleFileUpload(index, e.target.files[0])}
                                />
                                </>
                            )}
                            </td>
                        </tr>
                        ))}

                        {emptyRows > 0 && (
                        <tr style={{ height: 53 * emptyRows }}>
                            <td colSpan={6} />
                        </tr>
                        )}
                    </tbody>
                    </Table>

                        {/* Total Salary in the top right corner */}
                        <div
                        style={{
                            position: 'absolute',
                            right: '16px',
                            bottom: '8px',
                            textAlign: 'right',
                        }}
                        >
                        <strong>Total Amount :</strong>{' '}
                        {sortedRows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .reduce((sum, row) => sum + (row.tamount || 0), 0)
                            .toLocaleString()}
                        </div>

                        <TablePagination
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        colSpan={6}
                        count={sortedRows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                        />
                    </CardBody>
                    </Card>
                </Col>

            {/* Modal for options */}
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Select Evidence Source</ModalHeader>
                <ModalBody>
                <Button color="primary" block onClick={handleUseCamera}>
                    Use Saamkan Camera
                </Button>
                <Button
                    color="secondary"
                    block
                    onClick={() => {
                    document.getElementById(`file-upload-${selectedRowIndex}`).click();
                    toggleModal(); // Close modal after file input
                    }}
                >
                    Upload File
                </Button>
                <input
                    type="file"
                    id={`file-upload-${selectedRowIndex}`}
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileUpload(selectedRowIndex, e.target.files[0])}
                />
                </ModalBody>
                <ModalFooter>
                {/* <Button color="danger" onClick={toggleModal}>
                    Cancel
                </Button> */}
                </ModalFooter>
            </Modal>
        </div>
     </div>
  </>
  )
}

export default AddEvidance