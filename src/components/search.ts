import { Input, Div } from "../types";
import { WordList } from "./wordList";
import { Word, Type } from "../word";

export class Search {
	static base: Div;
	static isGlobal: boolean;
	static search: string = "";

	static init() {

		const prefix = "search";

		this.base = document.getElementById(prefix) as Div;
		const box = document.getElementById(prefix + "Box") as Input;
		const isGlobal = document.getElementById(prefix + "IsGlobal") as Input;

		box.addEventListener("input", () => {
			this.search = box.value;
			WordList.refresh();
		});
		
		this.isGlobal = isGlobal.checked;
		isGlobal.addEventListener("input", () => {
			this.isGlobal = isGlobal.checked;
			WordList.refresh();
		});
	}

	static hasSearch(): boolean {
		return this.search.trim() !== "";
	}

	static filter(): (word: Word) => boolean {
		return word => {
			if (!this.hasSearch()) {
				return true;
			}
			const terms = this.search.split(/\s+/g);
			for (const term of terms) {
				if (term.startsWith("is:")) {
					const type = term.substr(term.indexOf(":") + 1);
					if (Type[word.type].toLowerCase().indexOf(type.toLowerCase()) === -1) {
						return false;
					}
				} else {
					if (word.english.toLowerCase().indexOf(term.toLowerCase()) === -1 &&
						word.romaji.toLowerCase().indexOf(term.toLowerCase()) === -1) {
						return false;
					}
				}
			}
			return true;
		}
	}
}