import { createAction, props } from '@ngrx/store';
import { Doctor } from 'src/app/Model/doctor';

export const loadDoctors = createAction('[Doctor] Load Doctors');
export const loadDoctorsSuccess = createAction('[Doctor] Load Doctors Success', props<{ doctors: Doctor[] }>());
export const loadDoctorsFailure = createAction('[Doctor] Load Doctors Failure', props<{ error: any }>());

export const updateDoctor = createAction('[Doctor] Update Doctor', props<{ id: number, doctor: Partial<Doctor> }>());
export const updateDoctorSuccess = createAction('[Doctor] Update Doctor Success', props<{ id: number, doctor: Partial<Doctor> }>());
export const updateDoctorFailure = createAction('[Doctor] Update Doctor Failure', props<{ error: any }>());

export const deleteDoctor = createAction('[Doctor] Delete Doctor', props<{ id: number }>());
export const deleteDoctorSuccess = createAction('[Doctor] Delete Doctor Success', props<{ id: number }>());
export const deleteDoctorFailure = createAction('[Doctor] Delete Doctor Failure', props<{ error: any }>());
