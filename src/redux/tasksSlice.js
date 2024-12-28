// src/redux/tasksSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch Tasks (Read)
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async ({ url, method = 'GET', params = {}, token = null }, { rejectWithValue }) => {
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
      return result; // Este será el payload de la acción
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create Task
export const createTask = createAsyncThunk(
  'tasks/createTask',
  async ({ url, body, token = null }, { rejectWithValue }) => {
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
      return result; // Retorna la nueva tarea creada
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update Task
export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ url, id, data, token = null }, { rejectWithValue }) => {
    console.log("🚀 ~ id:", id)
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
      console.log("🚀 ~ response:", response)

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      return result; // Retorna la tarea actualizada
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete Task
export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async ({ url, id, token = null }, { rejectWithValue }) => {
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

      return id; // Retorna el ID de la tarea eliminada
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
      // Fetch Tasks
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

      // Create Task
      .addCase(createTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload); // Agrega la nueva tarea
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Update Task
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload; // Actualiza la tarea en el estado
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Delete Task
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload); // Elimina la tarea por ID
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default tasksSlice.reducer;
