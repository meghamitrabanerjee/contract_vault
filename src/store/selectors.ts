import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';

// Dashboard selectors
export const selectDashboardData = (state: RootState) => state.dashboard.data;
export const selectDashboardLoading = (state: RootState) => state.dashboard.loading;
export const selectDashboardError = (state: RootState) => state.dashboard.error;
export const selectSearchTerm = (state: RootState) => state.dashboard.searchTerm;
export const selectFilterStatus = (state: RootState) => state.dashboard.filterStatus;

// User selectors
export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;
export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;

// Contract selectors
export const selectContracts = (state: RootState) => state.contract.contracts;
export const selectContractLoading = (state: RootState) => state.contract.loading;
export const selectContractError = (state: RootState) => state.contract.error;
export const selectSelectedContract = (state: RootState) => state.contract.selectedContract;

// Derived selectors
export const selectFilteredProjects = createSelector(
  [selectDashboardData, selectSearchTerm, selectFilterStatus],
  (dashboardData, searchTerm, filterStatus) => {
    if (!dashboardData?.projects) return [];
    
    return dashboardData.projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.client.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }
);

export const selectUserProfile = createSelector(
  [selectDashboardData],
  (dashboardData) => dashboardData?.user || null
);

export const selectDashboardMetrics = createSelector(
  [selectDashboardData],
  (dashboardData) => dashboardData?.metrics || null
);

export const selectPayments = createSelector(
  [selectDashboardData],
  (dashboardData) => dashboardData?.payments || []
);

export const selectProjects = createSelector(
  [selectDashboardData],
  (dashboardData) => dashboardData?.projects || []
);
