import { createSlice } from '@reduxjs/toolkit';

export const settings = createSlice({
  name: 'settings',
  initialState: {
    // add new Employee
    setSettings: {
      loading: false,
      success: false,
      error: null
    },
    updateSettings: {
      loading: false,
      success: false,
      error: null
    }
  },
  reducers: {}
});

export default settings.reducer;
