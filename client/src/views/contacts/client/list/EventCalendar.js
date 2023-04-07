// ** React Import
import { useEffect, useRef, memo, Fragment, useState } from 'react';

// ** Full Calendar & it's Plugins
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Third Party Components
import { toast } from 'react-toastify';
import { Button, Card, CardBody } from 'reactstrap';
import { Menu, Check, ArrowLeft, ArrowRight } from 'react-feather';
import { getEvents } from '../../../calendar/event/store';
import { getUserData } from '../../../../utility/Utils';
import { useSelector } from 'react-redux';
// import '@styles/react/apps/app-calendar.scss';

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

const EventCalendar = (props) => {
  const { stepper } = props;
  // ** Refs
  const calendarRef = useRef(null);

  // ** Props
  const {
    store,
    isRtl,
    dispatch,
    calendarsColor,
    calendarApi,
    setCalendarApi,
    handleAddEventSidebar,
    blankEvent,
    toggleSidebar,
    selectEvent,
    updateEvent,
    selectedClients,
    selectedEventId,
    setSelectedEventId
  } = props;

  // ** State
  const [selectedEvent, setSelectedEvent] = useState(null);

  // ** UseEffect checks for CalendarAPI Update
  // useEffect(() => {
  //   if (calendarApi === null && calendarRef.current !== null) {
  //     setCalendarApi(calendarRef.current.getApi());
  //   }
  // }, [calendarApi, calendarRef]);

  useEffect(() => {
    dispatch(getEvents(getUserData().id));
  }, [dispatch]);

  function handleEventClick(info) {
    info.el.style.backgroundColor = '#E6F0E6';
    info.el.style.borderColor = '#5EBD3E';
    // Update selectedEvent state
    setSelectedEvent(info.event);
    try {
      setSelectedEventId(info.event._def.extendedProps._id);
    } catch {
      setSelectedEventId('');
    }
  }

  const events = useSelector((state) => state.event.events);

  // ** calendarOptions(Props)
  const calendarOptions = {
    events: events.length ? events : [],
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: 'dayGridMonth',
    // headerToolbar: {
    //     start: 'sidebarToggle, prev,next, title',
    //     end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    // },
    /*
      Enable dragging and resizing event
      ? Docs: https://fullcalendar.io/docs/editable
    */
    editable: true,

    // contentHeight: auto,
    height: 500,
    // aspectRation: 3,
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
      Max number of events within a given day
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
      const colorName = calendarsColor[calendarEvent._def.extendedProps.calendar];

      return [
        // Background Color
        `bg-light-${colorName}`
      ];
    },

    eventClick(info) {
      handleEventClick(info);
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

    // dateClick(info) {
    //   const ev = blankEvent;
    //   ev.start = info.date;
    //   ev.end = info.date;
    //   // dispatch(selectEvent(ev));
    //   // handleAddEventSidebar();
    // },

    /*
      Handle event drop (Also include dragged event)
      ? Docs: https://fullcalendar.io/docs/eventDrop
      ? We can use `eventDragStop` but it doesn't return updated event so we have to use `eventDrop` which returns updated event
    */
    eventDrop({ event: droppedEvent }) {
      dispatch(updateEvent(droppedEvent));
      toast.success(<ToastComponent title="Event Updated" color="success" icon={<Check />} />, {
        icon: false,
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false
      });
    },

    /*
      Handle event resize
      ? Docs: https://fullcalendar.io/docs/eventResize
    */
    eventResize({ event: resizedEvent }) {
      dispatch(updateEvent(resizedEvent));
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

  const handleNext = () => {
    if (!selectedEvent) {
      toast.error('Please select a event');
      return;
    }

    stepper.next();
  };

  return (
    <div>
      <Card className="shadow-none border-0 mb-0 rounded-0">
        <CardBody className="pb-0">
          {events.length > 0 && <FullCalendar {...calendarOptions} />}
        </CardBody>
      </Card>

      <div className="d-flex justify-content-between mt-2">
        <Button color="primary" className="btn-prev" onClick={() => stepper.previous()}>
          <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
          <span className="align-middle d-sm-inline-block d-none">Previous</span>
        </Button>
        <Button color="primary" className="btn-next" onClick={() => handleNext()}>
          <span className="align-middle d-sm-inline-block d-none">Next</span>
          <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
        </Button>
      </div>
    </div>
  );
};

export default memo(EventCalendar);
