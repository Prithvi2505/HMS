import { createReducer, on } from '@ngrx/store';
import { Doctor } from 'src/app/Model/doctor';
import { deleteDoctorFailure, deleteDoctorSuccess, loadDoctorsFailure, loadDoctorsSuccess, updateDoctorFailure, updateDoctorSuccess } from './doctor.action';

export interface DoctorState {
  list: Doctor[];
  error: any;
}

const initialState: DoctorState = {
  list: [],
  error: null
};

export const doctorReducer = createReducer(
  initialState,
  on(loadDoctorsSuccess, (state, { doctors }) => ({ ...state, list: doctors })),
  on(loadDoctorsFailure, (state, { error }) => ({ ...state, error })),
  on(updateDoctorSuccess, (state, { id, doctor }) => ({
    ...state,
    list: state.list.map(d => d.id === id ? { ...d, ...doctor } : d)
  })),
  on(deleteDoctorSuccess, (state, { id }) => ({
    ...state,
    list: state.list.filter(d => d.id !== id)
  })),
  on(updateDoctorFailure, deleteDoctorFailure, (state, { error }) => ({ ...state, error }))
);