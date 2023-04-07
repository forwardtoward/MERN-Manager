// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customInterIceptors } from '../../../lib/AxiosProvider';

// ** Axios Imports
import axios from 'axios';

const API = customInterIceptors();

export const fetchEvents = createAsyncThunk('appCalendar/fetchEvents', async (calendars) => {
  const response = await axios.get('/apps/calendar/events', { calendars });
  return response.data;
});

export const addEvent = createAsyncThunk(
  'appCalendar/addEvent',
  async (event, { dispatch, getState }) => {
    await axios.post('/apps/calendar/add-event', { event });
    await dispatch(fetchEvents(getState().calendar.selectedCalendars));
    return event;
  }
);

export const updateEvent = createAsyncThunk(
  'appCalendar/updateEvent',
  async (event, { dispatch, getState }) => {
    await axios.post('/apps/calendar/update-event', { event });
    await dispatch(fetchEvents(getState().calendar.selectedCalendars));
    return event;
  }
);

export const updateFilter = createAsyncThunk(
  'appCalendar/updateFilter',
  async (filter, { dispatch, getState }) => {
    if (getState().calendar.selectedCalendars.includes(filter)) {
      await dispatch(
        fetchEvents(getState().calendar.selectedCalendars.filter((i) => i !== filter))
      );
    } else {
      await dispatch(fetchEvents([...getState().calendar.selectedCalendars, filter]));
    }
    return filter;
  }
);

export const updateAllFilters = createAsyncThunk(
  'appCalendar/updateAllFilters',
  async (value, { dispatch }) => {
    if (value === true) {
      await dispatch(fetchEvents(['Events', 'Appointments', 'Bookings', 'Classes']));
    } else {
      await dispatch(fetchEvents([]));
    }
    return value;
  }
);

export const removeEvent = createAsyncThunk('appCalendar/removeEvent', async (id) => {
  await axios.delete('/apps/calendar/remove-event', { id });
  return id;
});

// ** Appointment

export const fetchAppointments = createAsyncThunk('appCalendar/fetchAppointments', async () => {
  const response = await API.get('/calendar/appointment/get');
  return response.data;
});

export const createAppointment = createAsyncThunk(
  'appCalendar/createAppointment',
  async (data, { dispatch }) => {
    const response = await API.post('/calendar/appointment/create', { ...data });
    await dispatch(fetchAppointments());
    return response;
  }
);

export const updateAppointment = createAsyncThunk(
  'appCalendar/updateAppointment',
  async (data, { dispatch }) => {
    const response = await API.post('/calendar/appointment/update', { ...data });
    await dispatch(fetchAppointments());
    return response;
  }
);

export const removeAppointment = createAsyncThunk('appCalendar/removeAppointment', async (id) => {
  await API.delete('/calendar/appointment/delete', { id });
  return id;
});

export const appCalendarSlice = createSlice({
  name: 'appCalendar',
  initialState: {
    events: [],
    selectedEvent: {},
    selectedCalendars: ['Events', 'Appointments', 'Bookings', 'Classes']
  },
  reducers: {
    selectEvent: (state, action) => {
      state.selectedEvent = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.events = action.payload.data;
      })
      .addCase(updateFilter.fulfilled, (state, action) => {
        if (state.selectedCalendars.includes(action.payload)) {
          state.selectedCalendars.splice(state.selectedCalendars.indexOf(action.payload), 1);
        } else {
          state.selectedCalendars.push(action.payload);
        }
      })
      .addCase(updateAllFilters.fulfilled, (state, action) => {
        const value = action.payload;
        let selected = [];
        if (value === true) {
          selected = ['Events', 'Appointments', 'Bookings', 'Classes'];
        } else {
          selected = [];
        }
        state.selectedCalendars = selected;
      });
  }
});

export const { selectEvent } = appCalendarSlice.actions;

export default appCalendarSlice.reducer;
