import { createReducer, on } from '@ngrx/store';
import { Patient } from 'src/app/Model/patient';
import { deletePatientFailure, deletePatientSuccess, loadPatientsFailure, loadPatientsSuccess, updatePatientFailure, updatePatientSuccess } from './patient.action';

export interface PatientState {
  list: Patient[];
  error: any;
}

const initialState: PatientState = {
  list: [],
  error: null
};

export const patientReducer = createReducer(
  initialState,
  on(loadPatientsSuccess, (state, { patients }) => ({ ...state, list: patients })),
  on(loadPatientsFailure, (state, { error }) => ({ ...state, error })),
  on(updatePatientSuccess, (state, { id, patient }) => ({
    ...state,
    list: state.list.map(p => p.id === id ? { ...p, ...patient } : p)
  })),
  on(deletePatientSuccess, (state, { id }) => ({
    ...state,
    list: state.list.filter(p => p.id !== id)
  })),
  on(updatePatientFailure, deletePatientFailure, (state, { error }) => ({ ...state, error }))
);