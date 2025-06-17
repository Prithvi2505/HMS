import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PatientState } from './patient.reducer';

export const selectPatientState = createFeatureSelector<PatientState>('patients');

export const selectPatientList = createSelector(
  selectPatientState,
  (state) => state.list
);

export const selectPatientError = createSelector(
  selectPatientState,
  (state) => state.error
);