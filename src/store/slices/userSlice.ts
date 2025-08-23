import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from '../../types';
import { authService } from '../../services/authService';

interface UserState {
  currentUser: UserProfile | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  token: string | null;
}

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  token: null,
};

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const result = await authService.login(credentials);
      return result;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Login failed');
    }
  }
);

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData: { name: string; email: string; password: string; role: 'freelancer' | 'client' }, { rejectWithValue }) => {
    try {
      const result = await authService.register(userData);
      return result;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Registration failed');
    }
  }
);

// Async thunk for user logout
export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      return null;
    } catch (error) {
      return rejectWithValue('Logout failed');
    }
  }
);

// Async thunk for checking authentication status
export const checkAuthStatus = createAsyncThunk(
  'user/checkAuthStatus',
  async (_, { rejectWithValue }) => {
    try {
      const currentUser = authService.getCurrentUser();
      const token = authService.getToken();
      
      if (!currentUser || !token) {
        return rejectWithValue('No valid authentication found');
      }
      
      return { user: currentUser, token };
    } catch (error) {
      return rejectWithValue('Authentication check failed');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserProfile>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.token = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      
      // Logout cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.currentUser = null;
        state.isAuthenticated = false;
        state.token = null;
      })
      
      // Check auth status cases
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.loading = false;
        state.currentUser = null;
        state.isAuthenticated = false;
        state.token = null;
      });
  },
});

export const { setCurrentUser, clearUser, clearError, setToken } = userSlice.actions;
export default userSlice.reducer;
