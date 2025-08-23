import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { DashboardData, Project, Payment } from '../../types';
import { apiService } from '../../services/api';
import { mockDashboardData } from '../../mockdata';

interface DashboardState {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
  searchTerm: string;
  filterStatus: string;
}

const initialState: DashboardState = {
  data: null,
  loading: false,
  error: null,
  searchTerm: '',
  filterStatus: 'all',
};

// Async thunk for fetching dashboard data
export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchDashboardData',
  async (_, { rejectWithValue }) => {
    try {
      return await apiService.getDashboardData();
    } catch (error) {
      return rejectWithValue('Failed to fetch dashboard data');
    }
  }
);

// Async thunk for updating user profile
export const updateUserProfile = createAsyncThunk(
  'dashboard/updateUserProfile',
  async (userData: any, { rejectWithValue }) => {
    try {
      return await apiService.updateUserProfile(userData);
    } catch (error) {
      return rejectWithValue('Failed to update profile');
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setFilterStatus: (state, action: PayloadAction<string>) => {
      state.filterStatus = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        if (state.data) {
          state.data.user = action.payload;
        }
      });
  },
});

export const { setSearchTerm, setFilterStatus, clearError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
