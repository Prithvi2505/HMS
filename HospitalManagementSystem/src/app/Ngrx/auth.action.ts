import { createAction, props } from "@ngrx/store";

export const login = createAction(
    "[Auth] Login",
    props<{userid:number,role:string}>()
);

export const logout = createAction("[Auth] logout")