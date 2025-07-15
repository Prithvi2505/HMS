import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DoctorService } from 'src/app/services/doctor.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import { deleteDoctor, deleteDoctorFailure, deleteDoctorSuccess, loadDoctors, loadDoctorsFailure, loadDoctorsSuccess, updateDoctor, updateDoctorFailure, updateDoctorSuccess } from './doctor.action';

@Injectable()
export class DoctorEffects {
  constructor(private actions$: Actions, private doctorService: DoctorService) {}

  loadDoctors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDoctors),
      mergeMap(() =>
        this.doctorService.getAllDoctors().pipe(
          map(doctors => loadDoctorsSuccess({ doctors })),
          catchError(error => of(loadDoctorsFailure({ error })))
        )
      )
    )
  );

  updateDoctor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateDoctor),
      mergeMap(({ id, doctor }) =>
        this.doctorService.updateDoctor(id, doctor).pipe(
          map(() => updateDoctorSuccess({ id, doctor })),
          catchError(error => of(updateDoctorFailure({ error })))
        )
      )
    )
  );

  deleteDoctor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteDoctor),
      mergeMap(({ id }) =>
        this.doctorService.deleteDoctor(id).pipe(
          map(() => deleteDoctorSuccess({ id })),
          catchError(error => of(deleteDoctorFailure({ error })))
        )
      )
    )
  );
}