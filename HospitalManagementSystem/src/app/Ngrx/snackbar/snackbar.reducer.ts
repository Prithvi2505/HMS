
import { createReducer, on } from '@ngrx/store';
import * as SnackbarActions from './snackbar.actions';

export interface SnackbarState {
  message: string | null;
  type: 'success' | 'error' | null;
}

const initialState: SnackbarState = {
  message: null,
  type: null,
};

export const snackbarReducer = createReducer(
  initialState,
  on(SnackbarActions.showSuccess, (state, { message }) => ({
    message,
    type: 'success' as const ,
  })),
  on(SnackbarActions.showError, (state, { message }) => ({
    message,
    type: 'error' as const ,
  })),
  on(SnackbarActions.clearSnackbar, () => initialState)
);
