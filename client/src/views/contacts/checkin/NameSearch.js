import React, { useState, useEffect } from 'react';
import { Input, Row, Button } from 'reactstrap';
import RecentCheckInItem from './RecentCheckInItem';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getEmployeeAttendanceAction, saveAttendEmployeeAction } from '../employee/store/actions';
const NameSearch = (props) => {
  const dispatch = useDispatch();
  const employeeStore = useSelector((state) => state.employeeContact);
  const attendanceStore = useSelector((state) => state.employeeContact.employeeAttance);
  const [attendanceList, setAttendanceList] = useState([]);
  useEffect(() => {
    setAttendanceList(attendanceStore?.data);
  }, [attendanceStore?.data]);
  useEffect(() => {
    dispatch(getEmployeeAttendanceAction());
  }, []);
  const { attendEmpArr, setAttendEmpArr } = props;
  const [inputValue, setInputValue] = useState('');

  const handleSearchTermChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleEnterPress = (e) => {
    let today = new Date().getDay();
    let current = new Date();

    var key = e.keyCode || e.which;
    if (key == 13 || e.target.id == 'check') {
      if (employeeStore.employeeList) {
        if (employeeStore.employeeList.data.list.find((item) => item.fullName == inputValue)) {
          employeeStore.employeeList.data.list.map((employee, index) => {
            if (employee.fullName == inputValue) {
              let canAttend = false,
                shiftId = 0;
              employee.shift.map((perShift, index) => {
                if (perShift.weekDay == today) {
                  canAttend = true;
                  shiftId = perShift._id;
                } else return;
              });
              if (canAttend == true) {
                if (attendanceList.find((item) => item.employeeId[0]._id == employee._id)) {
                  toast.error('You already punch in');
                  return;
                } else {
                  toast.success('You successfully punch in');
                  dispatch(
                    saveAttendEmployeeAction({
                      employeeId: employee._id,
                      shiftId: shiftId,
                      actualStart: current
                    })
                  );
                  if (!isFullScreen) {
                    setSidebarOpen(false);
                  }
                  history.push('/contacts/employee/info');
                  return;
                }
              } else {
                toast.error('Today is not your work day.');
                return;
              }
            } else return;
          });
        } else {
          toast.error('Invalid Name');
        }
      } else {
        return;
      }
    }
  };
  return (
    <div>
      <Row
        className="d-flex mb-2 justify-content-center"
        style={{ fontSize: '28px', fontWeight: 'bold', color: 'white' }}
      >
        Name Search
      </Row>
      <Row className="mb-2">
        <Input
          type="text"
          defautValue={inputValue}
          className="rounded-left px-2 py-1"
          style={{ borderRadius: '50px', backgroundColor: '#3e475e', color: 'white' }}
          onChange={handleSearchTermChange}
          onKeyUp={(e) => handleEnterPress(e)}
          placeholder="Enter name to search..."
        />
      </Row>
      <Row className="mb-2">
        <Button
          color="primary"
          id="check"
          className="rounded-50"
          onClick={(e) => handleEnterPress(e)}
        >
          Check In
        </Button>
      </Row>
    </div>
  );
};

export default NameSearch;
