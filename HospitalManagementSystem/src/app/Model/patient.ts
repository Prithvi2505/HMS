import { List } from "./list";

export interface Patient extends List {
    age:number,
    address: string,
    mobile_no: number,
}