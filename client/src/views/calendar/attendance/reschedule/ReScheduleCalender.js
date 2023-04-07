// ** React Import
import { useEffect, useRef, memo, Fragment } from 'react';

// ** Full Calendar & it's Plugins
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Third Party Components
import moment from 'moment';
import { toast } from 'react-toastify';
import { Card, CardBody } from 'reactstrap';
import { Menu, Check } from 'react-feather';

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux';
import { getClasses, selectClass, updateClass } from '../store';
import '../../../../assets/scss/form-builder/main.scss';

const ReScheduleCalender = (props) => {
  const { setReScheduleClass } = props;
  // ** Refs
  const calendarRef = useRef(null);
  // ** Variables
  const dispatch = useDispatch();
  const store = useSelector((state) => state.attendance.classes);
  const selectedClass = useSelector((state) => state.attendance.selectedClass);

  // ** Blank Event Object
  const blankClass = {
    title: '',
    start: '',
    end: '',
    allDay: false,
    url: '',
    extendedProps: {
      calendar: '',
      guests: [],
      location: '',
      description: ''
    }
  };

  // ** Fetch Events On Mount
  useEffect(() => {
    dispatch(getClasses());
  }, []);

  // ** calendarOptions(Props)
  const calendarOptions = {
    timeZone: 'local',
    height: 'parent',
    resourceAreaWidth: 230,
    aspectRatio: 1.5,
    contentHeight: '400px',
    events: store?.classes?.length ? store?.classes : [],
    //events: DefualtClass,
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: 'dayGridMonth',

    headerToolbar: {
      start: 'prev,next, title',
      end: 'dayGridMonth,listMonth'
    },

    views: {
      dayGridMonth: {
        // name of view
        titleFormat: { year: 'numeric', month: 'short' }
        // other view-specific options here
      }
    },
    /*
      Enable dragging and resizing event
      ? Docs: https://fullcalendar.io/docs/editable
    */
    editable: true,

    /*
      Enable resizing event from start
      ? Docs: https://fullcalendar.io/docs/eventResizableFromStart
    */
    eventResizableFromStart: true,

    /*
      Automatically scroll the scroll-containers during event drag-and-drop and date selecting
      ? Docs: https://fullcalendar.io/docs/dragScroll
    */
    dragScroll: true,

    /*
      Max  number of events within a given day
      ? Docs: https://fullcalendar.io/docs/dayMaxEvents
    */
    dayMaxEvents: 2,

    /*
      Determines if day names and week names are clickable
      ? Docs: https://fullcalendar.io/docs/navLinks
    */
    // navLinks: true,

    eventClassNames({ event: calendarEvent }) {
      // eslint-disable-next-line no-underscore-dangle
      const colorName = calendarEvent._def.extendedProps.programName[0].color;
      return [
        // Background Color
        `bg-light-${colorName}`
      ];
    },
    selectable: true,

    eventClick({ event: clickedEvent }) {
      // clickedEvent.setProp('backgroundColor', 'blue'); // set the background color to red
      clickedEvent.setProp('borderColor', '#174ae7 '); // set the border color to red
      setReScheduleClass({ ...clickedEvent.extendedProps, type: 'existingSchedule' });
    },

    dateClick(info) {
      // info.dayEl.style.backgroundColor = '#174ae7';
      //info.dayEl.style.color = '#ffff';
      const ev = blankClass;
      ev.start = info.date;
      ev.end = info.date;
      setReScheduleClass({
        type: 'newSchedule',
        programName: selectedClass?.programName,
        classTitle: selectedClass?.classTitle,
        userId: selectedClass?.userId,
        classDays: [],
        startDate: moment(info.date).format('YYYY-MM-DD'),
        endDate: moment(info.date).format('YYYY-MM-DD'),
        wholeSeriesEndDate: info.date,
        wholeSeriesStartDate: info.date
      });

      // dispatch(selectClass(ev));
      // handleAddEventSidebar();
    },

    ref: calendarRef
  };

  return (
    <div
      style={{
        maxHeight: '400px'
      }}
      className="pb-0 mini-calender"
    >
      <FullCalendar {...calendarOptions} />{' '}
    </div>
  );
};

export default memo(ReScheduleCalender);
