
import { createAction, props } from '@ngrx/store';

export const showSuccess = createAction(
  '[Snackbar] Show Success',
  props<{ message: string }>()
);

export const showError = createAction(
  '[Snackbar] Show Error',
  props<{ message: string }>()
);

export const clearSnackbar = createAction('[Snackbar] Clear');
