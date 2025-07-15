import { createReducer, on } from '@ngrx/store';
import { Staff } from 'src/app/Model/staff';
import { deleteStaffFailure, deleteStaffSuccess, loadStaffFailure, loadStaffSuccess, updateStaffFailure, updateStaffSuccess } from './staff.action';

export interface StaffState {
  list: Staff[];
  error: any;
}

const initialState: StaffState = {
  list: [],
  error: null
};

export const staffReducer = createReducer(
  initialState,
  on(loadStaffSuccess, (state, { staff }) => ({ ...state, list: staff })),
  on(loadStaffFailure, (state, { error }) => ({ ...state, error })),
  on(updateStaffSuccess, (state, { id, staff }) => ({
    ...state,
    list: state.list.map(s => s.id === id ? { ...s, ...staff } : s)
  })),
  on(deleteStaffSuccess, (state, { id }) => ({
    ...state,
    list: state.list.filter(s => s.id !== id)
  })),
  on(updateStaffFailure, deleteStaffFailure, (state, { error }) => ({ ...state, error }))
);
