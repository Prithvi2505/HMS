import { loadPatients } from 'src/app/Ngrx/patient/patient.action';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PatientService } from 'src/app/services/patient.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import { deletePatient, deletePatientFailure, deletePatientSuccess, loadPatientsFailure, loadPatientsSuccess, updatePatient, updatePatientFailure, updatePatientSuccess } from './patient.action';

@Injectable()
export class PatientEffects {
  constructor(private actions$: Actions, private patientService: PatientService) {}

  loadPatients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPatients),
      mergeMap(() =>
        this.patientService.getAllPatients().pipe(
          map(patients => loadPatientsSuccess({ patients })),
          catchError(error => of(loadPatientsFailure({ error })))
        )
      )
    )
  );

  updatePatient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePatient),
      mergeMap(({ id, patient }) =>
        this.patientService.updatePatient(id, patient).pipe(
          map(() => updatePatientSuccess({ id, patient })),
          catchError(error => of(updatePatientFailure({ error })))
        )
      )
    )
  );

  deletePatient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePatient),
      mergeMap(({ id }) =>
        this.patientService.deletePatient(id).pipe(
          map(() => deletePatientSuccess({ id })),
          catchError(error => of(deletePatientFailure({ error })))
        )
      )
    )
  );
}
