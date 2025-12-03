export interface PersonOverview {
    ID: number;
    NAME: string;
    ADDRESS: string;
    AUTHOR_PERSON_ID: number | null;
    MEMBER_PERSON_ID: number | null;
    STAFF_PERSON_ID: number | null;
}