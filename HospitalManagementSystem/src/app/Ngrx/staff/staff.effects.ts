
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StaffService } from 'src/app/services/staff.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import { deleteStaff, deleteStaffFailure, deleteStaffSuccess, loadStaff, loadStaffFailure, loadStaffSuccess, updateStaff, updateStaffFailure, updateStaffSuccess } from './staff.action';

@Injectable()
export class StaffEffects {
  constructor(private actions$: Actions, private staffService: StaffService) {}

  loadStaff$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadStaff),
      mergeMap(() =>
        this.staffService.getAllStaff().pipe(
          map(staff => loadStaffSuccess({ staff })),
          catchError(error => of(loadStaffFailure({ error })))
        )
      )
    )
  );

  updateStaff$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateStaff),
      mergeMap(({ id, staff }) =>
        this.staffService.updateStaff(id, staff).pipe(
          map(() => updateStaffSuccess({ id, staff })),
          catchError(error => of(updateStaffFailure({ error })))
        )
      )
    )
  );

  deleteStaff$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteStaff),
      mergeMap(({ id }) =>
        this.staffService.deleteStaff(id).pipe(
          map(() => deleteStaffSuccess({ id })),
          catchError(error => of(deleteStaffFailure({ error })))
        )
      )
    )
  );
}
