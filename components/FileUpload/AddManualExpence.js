import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from 'components/Sidebar/Sidebar';
import routes from 'routes';
import AdminNavbar from 'components/Navbars/AdminNavbar';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    Label
} from "reactstrap";

function AddManualExpence() {
    const location = useLocation();
    const navigate = useNavigate();
    const mainPanelRef = React.useRef(null);

    // Existing data from the location state
    const selectedData = location.state?.selectedData || [];

    // State to store form inputs
    const [expenseData, setExpenseData] = useState({
        type: 'Telephone',
        customType: '',
        date: '',
        payee: '',
        amount: '',
        details: ''
    });

    const [selectedType, setSelectedType] = useState('Minister.');
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
        return "Add Expenses Manual";
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setExpenseData({
            ...expenseData,
            [name]: value
        });
    };

    const handleAdd = (e) => {
      e.preventDefault();
  
      const newExpense = {
          ...expenseData,
          type: expenseData.type === 'Other' ? expenseData.customType : expenseData.type // Use custom type if "Other" is selected
      };
  
      // Navigate to ConfirmExpenses page with the updated data
      navigate('/confirm-expenses', {
        state: {
          selectedData: [...selectedData, newExpense] // Append new expense to existing data
        }
      });
      
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
                    <Row>
                        <Col md="8">
                            <Card>
                                <CardHeader>
                                    <h5 className="title">Add Expenses Manually</h5>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <Row>
                                            <Col md="5">
                                                <FormGroup>
                                                    <label>Expense Type</label>
                                                    <Input 
                                                        type="select" 
                                                        name="type" 
                                                        value={expenseData.type}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="Telephone">Telephone</option>
                                                        <option value="Food">Food</option>
                                                        <option value="Transport">Transport</option>
                                                        <option value="Other">Other</option>
                                                    </Input>
                                                </FormGroup>
                                                {expenseData.type === 'Other' && (
                                                    <FormGroup>
                                                        <Label for="customExpenseType">Specify Expense Type</Label>
                                                        <Input
                                                            type="text"
                                                            id="customExpenseType"
                                                            name="customType"
                                                            placeholder="Enter expense type"
                                                            value={expenseData.customType}
                                                            onChange={handleInputChange}
                                                        />
                                                    </FormGroup>
                                                )}
                                            </Col>
                                            <Col md="4">
                                                <FormGroup>
                                                    <label>Date</label>
                                                    <Input
                                                        type="date"
                                                        name="date"
                                                        value={expenseData.date}
                                                        onChange={handleInputChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="6">
                                                <FormGroup>
                                                    <label>Payee</label>
                                                    <Input
                                                        type="text"
                                                        name="payee"
                                                        value={expenseData.payee}
                                                        onChange={handleInputChange}
                                                        placeholder="Payee Name"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md="6">
                                                <FormGroup>
                                                    <label>Amount</label>
                                                    <Input
                                                        type="text"
                                                        name="amount"
                                                        value={expenseData.amount}
                                                        onChange={handleInputChange}
                                                        placeholder="Amount"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <label>Details</label>
                                                    <Input
                                                        type="text"
                                                        name="details"
                                                        value={expenseData.details}
                                                        onChange={handleInputChange}
                                                        placeholder="Explain about the expense"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Form>
                                </CardBody>
                                <CardFooter>
                                    <Button className="btn-fill" color="primary" onClick={handleAdd}>
                                        Add
                                    </Button>
                                </CardFooter>
                            </Card>
                        </Col>
                        <Col md="4"></Col>
                    </Row>
                </div>
            </div>
        </>
    );
}

export default AddManualExpence;
