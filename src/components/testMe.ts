import { Boxes, BOX_DONE, BOX_NEW } from "../boxes";
import { Button, capitalize, Div, Form, Language, languages, Td } from "../types";
import { Type, Word } from "../word";
import { Overview } from "./overview";

export class TestMe {

	static base: Div;
	static button: Button;
	static form: Form;
	static endSession: Button;
	static skip: Button;
	static fieldType: Td;
	static fields: Map<Language, Td>;

	static toTest: Word[][];
	static currentWord: Word;

	static init() {

		const prefix = "testMe";

		this.base = document.getElementById(prefix) as Div;
		this.button = document.getElementById(prefix + "Button") as Button;
		this.form = document.getElementById(prefix + "Form") as Form;
		this.endSession = document.getElementById(prefix + "EndSession") as Button;
		this.skip = document.getElementById(prefix + "Skip") as Button;

		const fieldPrefix = prefix + "Field";
		this.fieldType = document.getElementById(fieldPrefix + "Type") as Td;
		this.fields = new Map<Language, Td>();
		for (const language of languages) {
			const id = fieldPrefix + capitalize(language);
			this.fields.set(language, document.getElementById(id) as Td);
		}

		this.button.addEventListener("click", () => {
			Overview.setHidden(true);

			this.button.hidden = true;
			this.base.hidden = false;

			this.toTest = [];
			for (let box = 0; box < BOX_DONE; box++) {
				this.toTest.push([...Boxes.data[box]]);
			}

			this.nextWord();
		});

		this.skip.addEventListener("click", () => {
			this.nextWord();
		});

		this.endSession.addEventListener("click", () => {
			this.finish();
		});

		this.form.addEventListener("submit", event => {

			event.preventDefault();

			const inputs = this.form.querySelectorAll("input");
			const correct = [...inputs].every(input => matches(input.value, input.name));

			if (!correct) {
				Boxes.move(this.currentWord, BOX_NEW + 1, false);
				for (const header of languages) {
					const td = this.getField(header);
					const input = td.querySelectorAll("input")[0] || null;
					if (input) {
						td.innerHTML = "";
						td.innerText = input.value;
						const div = document.createElement("div");
						div.style.color = "red";
						div.innerText = this.currentWord[header];
						td.appendChild(div);
					}
				}
				return false;
			}

			if (inputs.length > 0 || this.currentWord.box == BOX_NEW) {
				Boxes.move(this.currentWord, this.currentWord.box + 1, false);
			}
			this.nextWord();

			return false;
		});
	}

	static nextWord() {

		if (this.toTest.every(box => box.length == 0)) {
			this.finish();
			alert("Training Session Complete!");
			return;
		}

		let selectedBox = -1;
		do {
			for (let box = 0; box < this.toTest.length; box++) {
				if (this.toTest[box].length > 0 && Math.random() < 0.3) {
					selectedBox = box;
					break;
				}
			}
		} while (selectedBox < 0);

		if (this.toTest[selectedBox].length == 0) {
			for (let box = 0; box < this.toTest.length; box++) {
				if (this.toTest[box].length > 0) {
					selectedBox = box;
					break;
				}
			}
		}

		const box = this.toTest[selectedBox];
		const index = Math.floor(Math.random() * box.length)
		this.currentWord = box.splice(index, 1)[0];

		this.fieldType.innerText = Type[this.currentWord.type];

		const given = Math.floor(Math.random() * languages.length);
		for (let i = 0; i < languages.length; i++) {
			const language = languages[i];
			const td = this.getField(language);
			td.innerHTML = td.innerText = "";
			if (i == given || selectedBox == 0) {
				td.innerText = this.currentWord[language];
			} else {
				const input = document.createElement("input");
				input.type = "text";
				input.lang = (language == "english" ? "en" : "ja");
				input.name = this.currentWord[language];
				td.appendChild(input);
				if (i == 0 || (i == 1 && given == 0)) {
					input.focus();
				}
			}
		}
	}

	static finish() {
		this.button.hidden = false;
		this.base.hidden = true;

		Overview.setHidden(false);
		Overview.refresh();
	}

	static getField(lang: Language) {
		const field = this.fields.get(lang);
		if (!field) {
			throw new Error("Missing Input Field");
		}
		return field;
	}
}

function matches(a: string, b: string): boolean {
	const left = a.replace(/\s+/g, "").split(";");
	const right = b.replace(/\s+/g, "").split(";");
	for (const s1 of left) {
		for (const s2 of right) {
			if (s1 == s2) {
				return true;
			}
		}
	}
	return false;
}
