import { createReducer, on } from "@ngrx/store";
import { login, logout } from "./auth.action";
import { authState, initialAuthState } from "../../Model/auth-model";

export const authReducer = createReducer<authState>(
  initialAuthState,
  on(login, (state, { userid, role }) => ({
    ...state,
    userid,
    role,
    isAuthenticated: true,
  })),
  on(logout, () => ({
    ...initialAuthState,
  }))
);
