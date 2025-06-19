import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SnackbarActions from './snackbar.actions';
import { tap } from 'rxjs/operators';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Injectable()
export class SnackbarEffects {
  constructor(private actions$: Actions, private snackbarService: SnackbarService) {}

  showSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SnackbarActions.showSuccess),
        tap(action => this.snackbarService.show(action.message, 'success'))
      ),
    { dispatch: false }
  );

  showError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SnackbarActions.showError),
        tap(action => this.snackbarService.show(action.message, 'error'))
      ),
    { dispatch: false }
  );
}
