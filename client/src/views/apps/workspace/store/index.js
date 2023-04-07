// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isEmptyObject } from 'jquery';

import { customInterIceptors } from '../../../../lib/AxiosProvider';

const API = customInterIceptors();

// ** Fetch Workspace - api
export const fetchWorkspaceApi = createAsyncThunk('appWorkspace/fetchWorkspace', async () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userId = userData?.id;
  const response = await API.get(`/workspace/get-all/${userId}`);
  return response.data;
});

export const getSelectedWorkspaceData = createAsyncThunk(
  'appSelectWorkspace/selectWorkspace',
  async (id) => {
    const response = await API.get(`/workspace/get/${id}`);
    const tmpTasks = response.data.tasks;
    tmpTasks.sort((a, b) => {
      return parseInt(a.id) - parseInt(b.id);
    });
    response.data.tasks = tmpTasks;
    return response.data;
  }
);

export const addWorkspace = createAsyncThunk(
  'appWorkspace/addWorkspace',
  async (data, { dispatch }) => {
    const response = await API.post('/workspace/add', data);
    await dispatch(fetchWorkspaceApi());
    return response.data;
  }
);

export const updateWorkspaceTitle = createAsyncThunk(
  'appWorkspace/updateWorkspaceTitle',
  async (data, { dispatch }) => {
    const response = await API.post('/workspace/update', data);
    await dispatch(fetchWorkspaceApi());
    return response.data;
  }
);

export const deleteWorkspace = createAsyncThunk(
  'appWorkspace/deleteWorkspace',
  async (data, { dispatch }) => {
    const response = await API.delete(`/workspace/delete/${data.id.toString()}`);
    await dispatch(fetchWorkspaceApi());
    return response;
  }
);

export const shareWorkspace = createAsyncThunk('appWorkspace/share', async (data, { dispatch }) => {
  const response = await API.post(`/workspace/share`, data);
  await dispatch(fetchWorkspaceApi());
  return response;
});

export const shareRevertWorkspace = createAsyncThunk(
  'appWorkspace/share',
  async (data, { dispatch }) => {
    const response = await API.post(`/workspace/share-revert`, data);
    await dispatch(fetchWorkspaceApi());
    return response;
  }
);

export const appWorkspaceSlice = createSlice({
  name: 'appWorkspace',
  initialState: {
    workspace: [],
    selectedWorkspace: {},
    boards: [],
    tasks: []
  },
  reducers: {
    handleSelectWorkspace: (state, action) => {
      state.selectedWorkspace = action.payload;
    },
    handleSelectTask: (state, action) => {
      state.selectedTask = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkspaceApi.fulfilled, (state, action) => {
        state.workspace = action.payload;
        if (isEmptyObject(state.selectedWorkspace)) {
          state.selectedWorkspace = action.payload[0];
        } else {
          state.selectedWorkspace =
            action.payload.filter((x) => x._id === state.selectedWorkspace._id)[0] ||
            action.payload[0];
        }
      })
      .addCase(getSelectedWorkspaceData.fulfilled, (state, action) => {
        state.boards = action.payload.boards;
        state.tasks = action.payload.tasks;
      });
  }
});

export const { handleSelectWorkspace, handleSelectTask } = appWorkspaceSlice.actions;

export default appWorkspaceSlice.reducer;
