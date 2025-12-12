import axios from "axios";

export const BOOK_BASE_URL = "/book";
export const PERSON_BASE_URL = "/person";
export const MEMBER_BASE_URL = "/member";
export const LOAN_BASE_URL = "/loan";
export const STAFF_BASE_URL = "/staff";
export const AUTHOR_BASE_URL = "/author";
export const COPY_BASE_URL = "/copy";

export const instance = axios.create({
    baseURL: "http://localhost:3001/api",
    headers: {"Cache-Control": "no-cache"}
});