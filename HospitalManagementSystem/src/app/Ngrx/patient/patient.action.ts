import { createAction, props } from '@ngrx/store';
import { Patient } from 'src/app/Model/patient';

export const loadPatients = createAction('[Patient] Load Patients');
export const loadPatientsSuccess = createAction('[Patient] Load Patients Success', props<{ patients: Patient[] }>());
export const loadPatientsFailure = createAction('[Patient] Load Patients Failure', props<{ error: any }>());

export const updatePatient = createAction('[Patient] Update Patient', props<{ id: number, patient: Partial<Patient> }>());
export const updatePatientSuccess = createAction('[Patient] Update Patient Success', props<{ id: number, patient: Partial<Patient> }>());
export const updatePatientFailure = createAction('[Patient] Update Patient Failure', props<{ error: any }>());

export const deletePatient = createAction('[Patient] Delete Patient', props<{ id: number }>());
export const deletePatientSuccess = createAction('[Patient] Delete Patient Success', props<{ id: number }>());
export const deletePatientFailure = createAction('[Patient] Delete Patient Failure', props<{ error: any }>());