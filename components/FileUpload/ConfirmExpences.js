// import React from 'react'
// import { useLocation } from 'react-router-dom'
// import Sidebar from 'components/Sidebar/Sidebar';
// import routes from 'routes';
// import AdminNavbar from 'components/Navbars/AdminNavbar';
// import { useNavigate } from 'react-router-dom';


// import {
//   CardHeader,
//   Row,
//   Col,
//   Card,
//   Table,
//   CardBody,
//   Button
// } from "reactstrap";

// function ConfirmExpences() {

//     const location = useLocation();
//     const mainPanelRef = React.useRef(null);
//     const selectedData = location.state?.selectedData || [];
//     const navigate = useNavigate();
//     const [sidebarOpened, setsidebarOpened] = React.useState(
//       document.documentElement.className.indexOf("nav-open") !== -1
//     );

//     const toggleSidebar = () => {
//       document.documentElement.classList.toggle("nav-open");
//       setsidebarOpened(!sidebarOpened);
//     };

//     const getBrandText = (path) => {
//       for (let i = 0; i < routes.length; i++) {
//         if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
//           return routes[i].name;
//         }
//       }
//       return "Confirm Expences";
//     };

//     const addmanual = () => {
//       navigate("/manual-addex" );
//     };

    

//   return (
//     <>
//     <Sidebar
//       routes={routes}
//       toggleSidebar={toggleSidebar}
//       logo={{
//         text: "Creative Tim",
//       }}
//     />
//     <div className="main-panel" ref={mainPanelRef}>
//       <AdminNavbar
//         brandText={getBrandText(location.pathname)}
//         toggleSidebar={toggleSidebar}
//         sidebarOpened={sidebarOpened}
//       />
//       <div className="content">
//       <Col className="ml-auto mr-auto" lg="7.2">
//           <Row className="justify-content-end"> {/* Use justify-content-end to align items to the right */}
//             <Col md="4">
//               <Button
//                 block
//                 color="info"
//                 onClick={addmanual}
//               >
//                 Add Expenses Manual
//               </Button>
//             </Col>
//           </Row>
//         </Col>

//         <Row>
//           <Col md="12">
//             <Card>
//               <CardHeader>Expenses List</CardHeader>
//               <CardBody>
//                 {selectedData.length > 0 ? (
//                   <Table>
//                     <thead>
//                       <tr>
//                         <th>Date</th>
//                         <th>Payee</th>
//                         <th>details</th>
//                         <th>Amount</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {selectedData.map((row, index) => (
//                         <tr key={index}>
//                           <td>{row.date}</td>
//                           <td>{row.payee}</td>
//                           <td>{row.details}</td>
//                           <td>{row.amount}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </Table>
//                 ) : (
//                   <p>No data selected.</p>
//                 )}

//               <Button
//                 color="primary"
//                 // disabled={selectedRows.length === 0}
//                 // onClick={handleSubmit}
//               >
//                 Confirm and Submit
//               </Button>
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       </div>
//     </div>
//   </>
        
//   )
// }

// export default ConfirmExpences;

import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from 'components/Sidebar/Sidebar';
import routes from 'routes';
import AdminNavbar from 'components/Navbars/AdminNavbar';
import { useNavigate } from 'react-router-dom';
import {
  CardHeader,
  Row,
  Col,
  Card,
  Table,
  CardBody,
  Button
} from "reactstrap";

function ConfirmExpences() {
    const location = useLocation();
    const mainPanelRef = React.useRef(null);
    const selectedData = location.state?.selectedData || []; // This contains both existing and new data
    const navigate = useNavigate();
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
      return "Confirm Expenses";
    };

    const addmanual = () => {
      navigate("/manual-addex");
    };

    const SubmitData =() => {
      navigate("/add-evidance")
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
        <Col className="ml-auto mr-auto" lg="7.2">
          <Row className="justify-content-end">
            <Col md="3">
              <Button
                block
                color="info"
                onClick={addmanual}
              >
                Add Expenses Manual
              </Button>
            </Col>
          </Row>
        </Col>

        <Row>
          <Col md="12">
            <Card>
              <CardHeader>Expenses List</CardHeader>
              <CardBody>
                {selectedData.length > 0 ? (
                  <Table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Payee</th>
                        <th>Details</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedData.map((row, index) => (
                        <tr key={index}>
                          <td>{row.date}</td>
                          <td>{row.payee}</td>
                          <td>{row.details}</td>
                          <td>{row.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <p>No data selected.</p>
                )}

                <Button
                  color="primary"
                  onClick={SubmitData}
                >
                  Confirm and Submit
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  </>
  );
}

export default ConfirmExpences;
