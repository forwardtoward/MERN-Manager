/* eslint-disable no-unused-vars */
// ** React Imports
import { Link, useParams } from 'react-router-dom';
// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
// ** Reactstrap Imports
import { Button, ListGroup, ListGroupItem, Badge, CardBody } from 'reactstrap';
import { useState } from 'react';
import '../../../assets/scss/style.css';

const SidebarLeft = (props) => {
  const [addAppointmentSidebarOpen, setAddAppointmentSidebarOpen] = useState(false);
  const [openAddClass, setOpenAddClass] = useState(false);
  const [viewAttendanceOpen, setViewAttendanceOpen] = useState(false);
  const [openViewAppointment, setOpenViewAppointment] = useState(false);

  const {
    viewBooking,
    setViewBooking,
    handleSidebarOpen,
    toggleSidebar,
    updateFilter,
    updateAllFilters,
    store,
    dispatch
  } = props;

  // ** Function to handle Add Event Click
  const handleAddEventClick = () => {
    toggleSidebar(false);
    handleSidebarOpen();
  };

  // ** Function to handle Add Appointment Click
  const handleAddAppointmentClick = () => {
    toggleSidebar(false);
  };
  const [active, setactive] = useState('THIS MONTH');
  // ** Props
  const handleActiveItem = (value) => {
    if (active === value) {
      return true;
    } else {
      return false;
    }
  };
  const handlechange = (value) => {
    setactive(value);
  };
  return (
    <div className={classnames('sidebar-left')}>
      <div className="sidebar" style={{height: "73.5vh"}}>
        <div className="sidebar-content email-app-sidebar">
          <div className="email-app-menu">
            <CardBody className="card-body">
              <Link to="/">
                <Button
                  color="primary"
                  block
                  onClick={(e) => {
                    e.preventDefault();
                    setViewBooking(!viewBooking);
                  }}
                >
                  <span className="align-middle">View Bookings</span>
                </Button>
              </Link>
            </CardBody>

            <ListGroup tag="div" className="list-group-messages contact-sidebar mt-2">
              <ListGroupItem
                className="cursor-pointer"
                action
                active={handleActiveItem('This Week')}
                onClick={() => {
                  handlechange('This Week');
                }}
              >
                <span className="align-middle">This Week</span>
                <Badge className="float-end" color="light-primary" pill>
                  {0}
                </Badge>
              </ListGroupItem>
              <ListGroupItem
                className="cursor-pointer"
                action
                active={handleActiveItem('THIS MONTH')}
                onClick={() => {
                  handlechange('THIS MONTH');
                }}
              >
                <span className="align-middle">This Month</span>
                <Badge className="float-end" color="light-primary" pill>
                  {0}
                </Badge>
              </ListGroupItem>
              <ListGroupItem
                className="cursor-pointer"
                action
                active={handleActiveItem('NEXT MONTH')}
                onClick={() => {
                  handlechange('NEXT MONTH');
                }}
              >
                <span className="align-middle">Next Month</span>
                <Badge className="float-end" color="light-primary" pill>
                  {0}
                </Badge>
              </ListGroupItem>
            </ListGroup>
            <h6 className="section-label mt-3 mb-1 px-2">Status</h6>
            <ListGroup tag="div" className="list-group-labels contact-sidebar-types">
              <ListGroupItem
                className="cursor-pointer"
                active={handleActiveItem('important')}
                action
                onClick={() => {
                  handlechange('important');
                }}
              >
                <span className="bullet bullet-sm bullet-success me-1"></span>
                Completed
              </ListGroupItem>
              <ListGroupItem
                className="cursor-pointer"
                active={handleActiveItem('private')}
                onClick={() => {
                  handlechange('private');
                }}
                action
              >
                <span className="bullet bullet-sm bullet-danger me-1"></span>
                Scheduled
              </ListGroupItem>
            </ListGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarLeft;
