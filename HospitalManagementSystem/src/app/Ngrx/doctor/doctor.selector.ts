import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DoctorState } from './doctor.reducer';

export const selectDoctorState = createFeatureSelector<DoctorState>('doctors');

export const selectDoctorList = createSelector(
  selectDoctorState,
  (state) => state.list
);

export const selectDoctorError = createSelector(
  selectDoctorState,
  (state) => state.error
);
