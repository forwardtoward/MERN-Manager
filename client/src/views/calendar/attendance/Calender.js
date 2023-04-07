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
import { getClasses, selectClass, updateClass } from './store';

// ** Toast Component
const ToastComponent = ({ title, icon, color }) => (
  <Fragment>
    <div className="toastify-header pb-0">
      <div className="title-wrapper">
        <Avatar size="sm" color={color} icon={icon} />
        <h6 className="toast-title">{title}</h6>
      </div>
    </div>
  </Fragment>
);

const Calendar = (props) => {
  // ** Refs
  const calendarRef = useRef(null);
  // ** Variables
  const dispatch = useDispatch();
  const store = useSelector((state) => state.attendance.classes);
  const userData = useSelector((state) => state.auth.userData);
  // ** Props
  const { isRtl, calendarApi, setCalendarApi, handleAddEventSidebar, toggleSidebar } = props;

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

  // ** UseEffect checks for CalendarAPI Update
  useEffect(() => {
    if (calendarApi === null) {
      setCalendarApi(calendarRef.current.getApi());
    }
  }, [calendarApi]);

  // ** Fetch Events On Mount
  useEffect(() => {
    dispatch(getClasses());
  }, []);

  // useEffect(() => {
  //   if (userData.empContactId) {
  //     dispatch(contactByIdAction({ _id: userData.empContactId }));
  //   }
  // }, [userData.empContactId]);

  // ** calendarOptions(Props)
  const calendarOptions = {
    timeZone: 'local',
    events: store?.classes?.length ? store?.classes : [],
    //events: DefualtClass,
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      start: 'sidebarToggle, prev,next, title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
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
    navLinks: true,

    eventClassNames({ event: calendarEvent }) {
      // eslint-disable-next-line no-underscore-dangle
      const colorName = calendarEvent._def.extendedProps.programName[0].color;
      return [
        // Background Color
        `bg-light-${colorName}`
      ];
    },

    eventClick({ event: clickedEvent }) {
      dispatch(selectClass(clickedEvent.extendedProps));
      let today = new Date();
      let selectedClass = clickedEvent.extendedProps;
      let start = new Date(selectedClass.startDate),
        end = new Date(selectedClass.endDate);
      if (start.getTime() < today.getTime() && today.getTime() < end.getTime()) {
        handleAddEventSidebar();
      } else {
        handleAddEventSidebar();
        toast.error('Today is not contraction day');
      }
      // * Only grab required field otherwise it goes in infinity loop
      // ! Always grab all fields rendered by form (even if it get `undefined`) otherwise due to Vue3/Composition API you might get: "object is not extensible"
      // event.value = grabEventDataFromEventApi(clickedEvent)

      // eslint-disable-next-line no-use-before-define
      // isAddNewEventSidebarActive.value = true
    },

    customButtons: {
      sidebarToggle: {
        text: <Menu className="d-xl-none d-block" />,
        click() {
          toggleSidebar(true);
        }
      }
    },

    dateClick(info) {
      const ev = blankClass;
      ev.start = info.date;
      ev.end = info.date;
      dispatch(selectClass(ev));
      handleAddEventSidebar();
    },

    /*
      Handle event drop (Also include dragged event)
      ? Docs: https://fullcalendar.io/docs/eventDrop
      ? We can use `eventDragStop` but it doesn't return updated event so we have to use `eventDrop` which returns updated event
    */
    eventDrop(info) {
      const droppedEvent = info?.event;
      const startDateRange = droppedEvent._instance.range.start;
      const endDateRange = droppedEvent._instance.range.end;
      const startDate = moment(startDateRange).format('YYYY-MM-DD');
      const endDate = moment(endDateRange).format('YYYY-MM-DD');
      const classStartTime = moment.utc(startDateRange).format('HH:mm');
      const classEndTime = moment.utc(endDateRange).format('HH:mm');
      const dropedEvent = {
        ...droppedEvent._def.extendedProps,
        startDate,
        endDate,
        classStartTime,
        classEndTime
      };
      dispatch(updateClass(dropedEvent));
    },

    /*
      Handle event resize
      ? Docs: https://fullcalendar.io/docs/eventResize
    */
    eventResize({ event: resizedEvent }) {
      const startDateRange = resizedEvent._instance.range.start;
      const endDateRange = resizedEvent._instance.range.end;
      const startDate = moment(startDateRange).format('YYYY-MM-DD');
      const endDate = moment(endDateRange).format('YYYY-MM-DD');
      const classStartTime = moment(startDateRange).format('HH:mm');
      const classEndTime = moment(endDateRange).format('HH:mm');
      const resizeEvent = {
        ...resizedEvent._def.extendedProps,
        startDate,
        endDate,
        classStartTime,
        classEndTime
      };
      dispatch(updateClass(resizeEvent));
      toast.success(<ToastComponent title="Event Updated" color="success" icon={<Check />} />, {
        icon: false,
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false
      });
    },

    ref: calendarRef,

    // Get direction from app state (store)
    direction: isRtl ? 'rtl' : 'ltr'
  };

  return (
    <Card className="shadow-none border-0 mb-0 rounded-0">
      <CardBody className="pb-0">
        <FullCalendar {...calendarOptions} />{' '}
      </CardBody>
    </Card>
  );
};

export default memo(Calendar);
