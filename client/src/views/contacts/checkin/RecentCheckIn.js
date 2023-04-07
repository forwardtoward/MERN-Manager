import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RecentCheckInItem from './RecentCheckInItem';
import { getEmployeeAttendanceAction } from '../employee/store/actions';
const RecentCheckIn = (props) => {
  const { isViewAll } = props;
  const dispatch = useDispatch();
  const store = useSelector((state) => state.employeeContact.employeeAttance);
  const [attendanceList, setAttendanceList] = useState([]);
  useEffect(() => {
    if (isViewAll) {
      setAttendanceList(store?.data);
    } else {
      setAttendanceList(store?.data.slice(0, 5));
    }
  }, [store?.data]);
  useEffect(() => {
    dispatch(getEmployeeAttendanceAction());
  }, []);

  return (
    <div>
      {attendanceList && attendanceList.length > 0 ? (
        attendanceList.map((attendance, index) => {
          return (
            <RecentCheckInItem
              employeeId={attendance.employeeId[0]._id}
              employeeName={attendance.employeeId[0].fullName}
              start={attendance.start}
              end={attendance.end}
              actualStart={attendance.actualStart}
              shiftName={attendance.shiftName ? attendance.shiftName : 'Day Shift'}
              key={'employee-' + index}
            />
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default RecentCheckIn;
