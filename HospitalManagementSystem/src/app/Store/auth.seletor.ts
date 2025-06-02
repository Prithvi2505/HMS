import { createFeatureSelector, createSelector } from "@ngrx/store";
import { authState } from "../Model/auth-model";

export const selectAuthState = createFeatureSelector<authState>('auth');

export const selectisAuthenticated  = createSelector(
    selectAuthState,
    (state: authState) =>{
        return state.isAuthenticated;
    }
    
);
export const selectUserId =  createSelector(
    selectAuthState,
    (state: authState) => {
        return state.userid;
    }
)
export const selectrole =  createSelector(
    selectAuthState,
    (state: authState) => {
        return state.role;
    }
)