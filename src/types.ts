export type DataBase = firebase.firestore.CollectionReference;

export type Td = HTMLTableDataCellElement;
export type Th = HTMLTableHeaderCellElement;
export type Tr = HTMLTableRowElement;
export type Div = HTMLDivElement;
export type Form = HTMLFormElement;
export type Input = HTMLInputElement;
export type Table = HTMLTableElement;
export type Button = HTMLButtonElement;
export type Select = HTMLSelectElement;

export type Language = "english" | "japanese" | "romaji";
export const languages: Language[] = ["english", "japanese", "romaji"];

export type Header = Language | "type";
export const headers: Header[] = ["type", "english", "japanese", "romaji"];

export function capitalize(word: string): string {
	return word[0].toUpperCase() + word.substr(1);
}
