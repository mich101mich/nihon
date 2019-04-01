import { Header, Language } from "./types";

export class Word {
	id: string;
	data: Data;

	constructor(id: string, data: Data) {
		this.id = id;
		this.data = data;
	}
	get english() { return this.data.english; }
	set english(value: string) { this.data.english = value; }
	get japanese() { return this.data.japanese; }
	set japanese(value: string) { this.data.japanese = value; }
	get romaji() { return this.data.romaji; }
	set romaji(value: string) { this.data.romaji = value; }
	get type() { return this.data.type; }
	set type(value: Type) { this.data.type = value; }
	get box() { return this.data.box; }
	set box(value: number) { this.data.box = value; }
}

export interface Data {
	english: string;
	japanese: string;
	romaji: string;
	type: Type;
	box: number;
}

export enum Type {
	Noun,
	Adjective,
	Verb,
	Sentence
}

