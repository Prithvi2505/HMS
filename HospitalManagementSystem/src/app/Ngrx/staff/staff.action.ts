import { createAction, props } from '@ngrx/store';
import { Staff } from 'src/app/Model/staff';

export const loadStaff = createAction('[Staff] Load Staff');
export const loadStaffSuccess = createAction('[Staff] Load Staff Success', props<{ staff: Staff[] }>());
export const loadStaffFailure = createAction('[Staff] Load Staff Failure', props<{ error: any }>());

export const updateStaff = createAction('[Staff] Update Staff', props<{ id: number, staff: Partial<Staff> }>());
export const updateStaffSuccess = createAction('[Staff] Update Staff Success', props<{ id: number, staff: Partial<Staff> }>());
export const updateStaffFailure = createAction('[Staff] Update Staff Failure', props<{ error: any }>());

export const deleteStaff = createAction('[Staff] Delete Staff', props<{ id: number }>());
export const deleteStaffSuccess = createAction('[Staff] Delete Staff Success', props<{ id: number }>());
export const deleteStaffFailure = createAction('[Staff] Delete Staff Failure', props<{ error: any }>());
