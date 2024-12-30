import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showSnackbar } from '../services/snackbarService';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async ({ url, method = 'GET', params = {}, token = null, message = "" }, { rejectWithValue }) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      };

      const urlWithParams = new URL(url);
      Object.keys(params).forEach((key) =>
        urlWithParams.searchParams.append(key, params[key])
      );

      const response = await fetch(urlWithParams, {
        method,
        headers,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      showSnackbar(message || 'Success, The tasks were fetched', 'success'); 

      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const createTask = createAsyncThunk(
  'tasks/createTask',
  async ({ url, body, token = null, message = "" }, { rejectWithValue }) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      };

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      showSnackbar(message || 'Task created successfully', 'success');

      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ url, id, data, token = null, message = "" }, { rejectWithValue }) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      };

      const response = await fetch(`${url}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      showSnackbar(message || 'Task updated successfully', 'success');

      return result; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async ({ url, id, token = null, message = "" }, { rejectWithValue }) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      };

      const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      showSnackbar(message || 'Task deleted successfully', 'success');

      return id; 

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      
      .addCase(createTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload); 
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload; 
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload); 
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default tasksSlice.reducer;
