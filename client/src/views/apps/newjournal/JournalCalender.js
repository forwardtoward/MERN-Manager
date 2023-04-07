import React from 'react';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '@styles/react/apps/app-calendar.scss';
import '../../../../src/assets/styles/jaornal.scss';
import { getDateJournalData } from '../../../requests/myJournal/getMyJournal';

const JournalCalender = ({ setViewType, setJournalData }) => {
  function handleDateSelect(info) {
    async function fetchData() {
      await getDateJournalData(info.startStr).then((response) => {
        setViewType('List View');
        setJournalData(response);
      });
    }
    fetchData();
  }
  return (
    <div className="calendar my-2">
      <FullCalendar
        height="auto"
        initialView="dayGridMonth"
        plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin]}
        headerToolbar={{
          start: 'sidebarToggle, prev,next, title',
          end: 'dayGridMonth'
        }}
        selectable={true}
        select={handleDateSelect}
      />
    </div>
  );
};

export default JournalCalender;
