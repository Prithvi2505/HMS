import { List } from "./list";

export interface Doctor extends List {
    yearOfExperience: number,
    specialization: string,
    maxAppointmentsPerDay: number,
    startTime: string;
    endTime: string;
    availableDays: string[];
}