// ** React Imports
import React, { useEffect, useState } from 'react';
import { Badge, Button, Col, Modal, ModalBody, ModalHeader, Row, Label, Input } from 'reactstrap';
import { Trash2, Calendar, CheckCircle, X } from 'react-feather';
import Flatpickr from 'react-flatpickr';

// ** Third Party Components
import moment from 'moment';
// ** Utils
import { selectThemeColors } from '@utils';
import Select, { components } from 'react-select';
import { useDispatch } from 'react-redux';
import ReScheduleCalender from './ReScheduleCalender';
import { oneTimeSchedule, ongoingTimeSchedule } from '../store';

const Reschedule = (props) => {
  const { bookingRow, setBookRescheduleModal } = props;
  const dispatch = useDispatch();
  const [rescheduleClass, setReScheduleClass] = useState({});
  const [currentRange, setCurrentRange] = useState({
    value: 0,
    label: '0'
  });
  const [classStartTime, setClassStartTime] = useState(moment().format('HH:mm'));
  const [classEndTime, setClassEndTime] = useState(moment().format('HH:mm'));
  const [isClassStartTimeChange, setIsClassStartTimeChange] = useState(false);
  const [classTitle, setClassTitle] = useState('');

  useEffect(() => {
    if (rescheduleClass?._id) {
      setClassTitle(rescheduleClass.classTitle);
      setClassEndTime(rescheduleClass.classEndTime);
      setClassStartTime(rescheduleClass?.classStartTime);

      const startDateTime = moment(
        `${rescheduleClass?.startDate} ${rescheduleClass?.classStartTime}`
      ).format('YYYY-MM-DD HH:mm');
      const endDateTime = moment(
        `${rescheduleClass?.endDate} ${rescheduleClass?.classEndTime}`
      ).format('YYYY-MM-DD HH:mm');
      const diffInMinutes = moment(endDateTime).diff(startDateTime, 'minutes');
      setCurrentRange({
        value: diffInMinutes,
        label: `${diffInMinutes}`
      });
    } else {
      setClassTitle('');
      setClassStartTime(moment().format('HH:mm'));
      setClassEndTime(moment().format('HH:mm'));
      setCurrentRange({
        value: 0,
        label: '0'
      });
    }
  }, [rescheduleClass]);

  useEffect(() => {
    if (currentRange.value != 0) {
      setClassEndTime(
        moment(classStartTime, 'HH:mm').add(currentRange.value, 'minutes').format('HH:mm')
      );
    } else {
      setClassEndTime(moment(classStartTime, 'HH:mm').format('HH:mm'));
    }
  }, [currentRange, isClassStartTimeChange]);

  const handleOneTimeSchedule = () => {
    const payload = {
      ...rescheduleClass,
      classStartTime,
      classEndTime,
      bookingId: bookingRow?._id
    };
    dispatch(oneTimeSchedule(payload));
    setBookRescheduleModal(false);
  };

  const handleOngoingTimeSchedule = () => {
    const payload = {
      seriesId: rescheduleClass?.seriesId,
      bookingRow: bookingRow
    };
    dispatch(ongoingTimeSchedule(payload));
    setBookRescheduleModal(false);
  };

  const rangeOptions = [
    { value: 0, label: '0' },
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 15, label: '15' },
    { value: 20, label: '20' },
    { value: 25, label: '25' },
    { value: 30, label: '30' },
    { value: 35, label: '35' },
    { value: 40, label: '40' },
    { value: 45, label: '45' },
    { value: 50, label: '50' },
    { value: 55, label: '55' },
    { value: 60, label: '60' },
    { value: 65, label: '65' },
    { value: 70, label: '70' },
    { value: 75, label: '75' },
    { value: 80, label: '80' },
    { value: 85, label: '85' },
    { value: 90, label: '90' }
  ];

  return (
    <div>
      <Row>
        <Col style={{ height: '440px' }} className="text-center mb-1" xs={12}>
          <ReScheduleCalender setReScheduleClass={setReScheduleClass} />
        </Col>
        <Col className="mb-1 mt-1" xs={12}>
          <div className="row g-3">
            <div className="col-md-6">
              <div className="mb-1">
                <Label className="form-label" for="classStartTime" required>
                  Start Time
                </Label>
                <Flatpickr
                  required
                  id="classStartTime"
                  name="classStartTime"
                  className="form-control"
                  onChange={(time) => {
                    setClassStartTime(moment(time[0]).format('HH:mm'));
                    setIsClassStartTimeChange(true);
                  }}
                  value={classStartTime}
                  options={{
                    enableTime: true,
                    noCalendar: true,
                    dateFormat: 'G:i K'
                  }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-1">
                <Label className="form-label" for="classEndTime">
                  End Time
                </Label>
                <Flatpickr
                  required
                  id="classEndTime"
                  name="classEndTime"
                  className="form-control"
                  // onChange={setClassEndTime(moment(classStartTime, 'HH:mm').add(currentRange.value, 'minutes').format('HH:mm'))}
                  /*   value={
                          classStartTime || currentRange.value != 0 || !selectedClass?.classEndTime
                            ? classEndTime
                            : selectedClass?.classEndTime
                        } */
                  value={classEndTime}
                  options={{
                    enableTime: true,
                    noCalendar: true,
                    dateFormat: 'G:i K'
                  }}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-6 mt-0">
              <div className="mb-1">
                <Label className="form-label" for="title">
                  Selected Class
                </Label>
                <Input
                  id="title"
                  value={classTitle}
                  placeholder="Class Name"
                  // onChange={(event) => setClassTitle(event.target.value)}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-4 mt-0">
              <div className="mb-1">
                <Label className="form-label" for="SelectMinutes">
                  Select Minutes
                </Label>
                <Select
                  menuPosition="fixed"
                  id="SelectMinutes"
                  name="SelectMinutes"
                  theme={selectThemeColors}
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={rangeOptions}
                  value={currentRange}
                  onChange={(data) => {
                    setCurrentRange(data);
                  }}
                />
              </div>
            </div>
          </div>
        </Col>
        <Col className="text-center " xs={12}>
          <Button
            className="mt-0 me-3"
            outline
            onClick={() => handleOneTimeSchedule()}
            disabled={
              rescheduleClass?._id || rescheduleClass?.type === 'newSchedule' ? false : true
            }
          >
            One Time
          </Button>
          <Button
            className="mt-0"
            color="primary"
            onClick={() => {
              handleOngoingTimeSchedule();
            }}
            disabled={!rescheduleClass?.seriesId}
          >
            Ongoing
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Reschedule;
