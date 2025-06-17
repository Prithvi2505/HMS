export interface authState {
    isAuthenticated: boolean,
    userid : number | null,
    role: string | null
}
export const initialAuthState : authState = {
    isAuthenticated: false,
    userid: null,
    role: null
}