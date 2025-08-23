import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Contract } from '../../types';

interface ContractState {
  contracts: Contract[];
  loading: boolean;
  error: string | null;
  selectedContract: Contract | null;
}

const initialState: ContractState = {
  contracts: [],
  loading: false,
  error: null,
  selectedContract: null,
};

// Async thunk for downloading contract
export const downloadContract = createAsyncThunk(
  'contract/downloadContract',
  async ({ contractId, fileName }: { contractId: number; fileName: string }, { rejectWithValue }) => {
    try {
      await apiService.downloadContract(contractId, fileName);
      return { contractId, fileName };
    } catch (error) {
      return rejectWithValue('Failed to download contract');
    }
  }
);

// Async thunk for generating contract
export const generateContract = createAsyncThunk(
  'contract/generateContract',
  async (projectData: any, { rejectWithValue }) => {
    try {
      return await apiService.generateContract(projectData);
    } catch (error) {
      return rejectWithValue('Failed to generate contract');
    }
  }
);

// Async thunk for reporting dispute
export const reportDispute = createAsyncThunk(
  'contract/reportDispute',
  async ({ projectId, reason }: { projectId: number; reason: string }, { rejectWithValue }) => {
    try {
      return await apiService.reportDispute(projectId, reason);
    } catch (error) {
      return rejectWithValue('Failed to report dispute');
    }
  }
);

const contractSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {
    setSelectedContract: (state, action: PayloadAction<Contract | null>) => {
      state.selectedContract = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    addContract: (state, action: PayloadAction<Contract>) => {
      state.contracts.push(action.payload);
    },
    updateContract: (state, action: PayloadAction<Contract>) => {
      const index = state.contracts.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.contracts[index] = action.payload;
      }
    },
    removeContract: (state, action: PayloadAction<number>) => {
      state.contracts = state.contracts.filter(c => c.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(downloadContract.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(downloadContract.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(downloadContract.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(generateContract.fulfilled, (state, action) => {
        state.contracts.push(action.payload);
      })
      .addCase(reportDispute.fulfilled, (state, action) => {
        // Handle dispute reporting success
        console.log('Dispute reported successfully:', action.payload);
      });
  },
});

export const { 
  setSelectedContract, 
  clearError, 
  addContract, 
  updateContract, 
  removeContract 
} = contractSlice.actions;
export default contractSlice.reducer;
