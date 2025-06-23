import { List } from "./list";

export interface Patient extends List {
    age:number,
    city: string,
    mobileNo: number,
}