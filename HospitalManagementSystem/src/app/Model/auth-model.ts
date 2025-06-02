export interface authState {
    isAuthenticated: boolean,
    userid : string | null,
    role: string | null
}
export const initialAuthState : authState = {
    isAuthenticated: false,
    userid: null,
    role: null
}