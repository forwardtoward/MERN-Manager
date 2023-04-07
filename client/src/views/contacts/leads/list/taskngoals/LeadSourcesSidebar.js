// ** React Imports
import { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Columns,
  MoreHorizontal,
  Edit,
  Trash,
  Filter,
  Users,
  MoreVertical
} from 'react-feather';
// ** Reactstrap Imports
import {
  Button,
  FormFeedback,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  Card,
  NavLink
} from 'reactstrap';
import '../../../../../assets/scss/style.css';
import Select from 'react-select';

const WorkspaceSidebar = (props) => {
  const { active, clientStore, fetchData, fetchContactListAction } = props;
  const [activeSidebar, setActiveSidebar] = useState('1');
  const [activeDaySidebar, setActiveDaySidebar] = useState('1');

  const toggleTab = (tab) => {
    if (activeSidebar !== tab) {
      setActiveSidebar(tab);
    }
  };
  const toggleTabs = (tab) => {
    if (activeDaySidebar !== tab) {
      setActiveDaySidebar(tab);
    }
  };

  const [selectedLeadSource, setSelectedLeadSource] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [filterByMonths, setFilterByMonths] = useState(null);
  const [filterByDays, setFilterByDays] = useState(null);

  const monthOptions = [
    { value: 'This Week', label: 'This Week' },
    { value: 'This Month', label: 'This Month' },
    { value: 'Past 30 Days', label: 'Past 30 Days' },
    { value: 'Past 60 Days', label: 'Past 60 Days' },
    { value: 'Past 90 Days', label: 'Past 90 Days' },
    { value: '+ 90 Days', label: '+ 90 Days' }
  ];

  const leadsourceOptions = clientStore?.leadSources?.map((tag) => {
    return {
      value: tag?.title,
      label: (
        <div>
          {tag?.title}
          {/* <Badge className="float-end" color="light-primary" pill>
            {'0'}
          </Badge> */}
        </div>
      )
    };
  });

  const tagOptions = clientStore?.tags?.map((tag) => {
    return {
      value: tag?.value,
      label: (
        <div>
          <span className={`bullet bullet-sm bullet-${tag.color} me-1`}></span>
          {tag?.value}
          <Badge className="float-end" color="light-primary" pill>
            {'0'}
          </Badge>
        </div>
      )
    };
  });

  // Handle select change

  const handleSelectDayChange = (selectedOption) => {
    setSelectedTag(selectedOption);
  };
  const handleSelectLeadChange = (selectedOption) => {
    setSelectedLeadSource(selectedOption);
  };

  return (
    <ListGroup className="sidebar-menu-list border-0" options={{ wheelPropagation: false }}>
      <div className="leadsources">
        {' '}
        <div className="mt-1 social">
          {monthOptions.map((tag, index) => {
            const tabNumber = (index + 1).toString();
            return (
              <ListGroupItem
                style={{ cursor: 'pointer' }}
                active={activeSidebar === tabNumber}
                onClick={() => toggleTab(tabNumber)}
                action
              >
                {tag?.value}
                <Badge className="float-end" color="light-primary" pill>
                  {'0'}
                </Badge>
              </ListGroupItem>
            );
          })}

          {/* <Select
          className="react-select-container mt-1"
          classNamePrefix="react-select"
          options={leadsourceMonths}
          value={filterByMonths}
          onChange={(selectedOption) => handleSelectDayChange(selectedOption, setFilterByMonths)}
          isClearable
        /> */}
        </div>
        <div className="mt-1 p-1">
          <div className="d-flex">
            <div
              color="flat-dark"
              className="d-flex align-items-center"
              style={{ fontSize: '1.285rem', fontWeight: 800 }}
            >
              <Filter size={14} />
              <h6 className="section-label px-1">Filter Lead Type</h6>
            </div>
          </div>
          <Select
          styles={{zIndex: "9999"}}
            className="react-select-container mt-1"
            classNamePrefix="react-select"
            options={leadsourceOptions}
            value={selectedLeadSource}
            onChange={handleSelectLeadChange}
            isClearable
            
          />
        </div>
        <div className="d-flex p-1">
          <div
            color="flat-dark"
            className="d-flex align-items-center"
            style={{ fontSize: '1.285rem', fontWeight: 800 }}
          >
            <Filter size={14} />
            <h6 className="section-label px-1">Filter Tags</h6>
          </div>
        </div>
        <div className="month">
          {clientStore?.tags?.map((tag, i) => {
            const tagNum = (i + 1).toString();
            return (
              <>
                <ListGroupItem
                  className="border-0"
                  style={{ cursor: 'pointer' }}
                  active={activeDaySidebar === tagNum}
                  onClick={() => toggleTabs(tagNum)}
                  action
                >
                  <span className={`bullet bullet-sm bullet-${tag.color} me-1`}></span>
                  {tag?.value}

                  {/* <Badge className="float-end" color="light-primary" pill>
                    {'0'}
                  </Badge> */}
                </ListGroupItem>
              </>
            );
          })}
        </div>
      </div>
    </ListGroup>
  );
};

export default WorkspaceSidebar;
