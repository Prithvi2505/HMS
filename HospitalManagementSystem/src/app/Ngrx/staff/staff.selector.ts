import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StaffState } from './staff.reducer';

export const selectStaffState = createFeatureSelector<StaffState>('staff');

export const selectStaffList = createSelector(
  selectStaffState,
  (state) => state.list
);

export const selectStaffError = createSelector(
  selectStaffState,
  (state) => state.error
);