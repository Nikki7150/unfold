export type Article = {
    id: string;
    url: string;
    title: string;
    dateAdded: string;
    dateRead: string | null;
    datePicked: string | null;
    note: string | null;
}