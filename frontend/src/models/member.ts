import {Person} from "@/models/person";

export interface Member extends Person {
    PERSON_ID: number;
    JOINED: string;
    TERMINATED: string;
}