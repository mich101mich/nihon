import { Boxes, BOX_NEW } from "../boxes";
import { Button, capitalize, Form, Input, Language, languages, Select } from "../types";
import { Data, Type } from "../word";

export class AddWord {

	static base: Form;
	static button: Button;
	static cancel: Button;
	static fieldType: Select;
	static fields: Map<Language, Input>;

	static init() {

		const prefix = "addWord";

		this.base = document.getElementById(prefix) as Form;
		this.button = document.getElementById(prefix + "Button") as Button;
		this.cancel = document.getElementById(prefix + "Cancel") as Button;

		const fieldPrefix = prefix + "Field";
		this.fieldType = document.getElementById(fieldPrefix + "Type") as Select;
		this.fields = new Map<Language, Input>();
		for (const language of languages) {
			const id = fieldPrefix + capitalize(language);
			this.fields.set(language, document.getElementById(id) as Input);
		}

		this.button.addEventListener("click", () => {
			this.button.hidden = true;
			this.base.hidden = false;
		});

		this.cancel.addEventListener("click", () => {
			this.button.hidden = false;
			this.base.hidden = true;
		})

		this.base.addEventListener("submit", event => {

			event.preventDefault();

			for (const input of this.fields.values()) {
				if (input.value.trim() == "") {
					return false;
				}
			}

			let data: Data = { english: "", japanese: "", romaji: "", type: Type.Noun, box: BOX_NEW };
			for (const language of languages) {
				data[language] = this.fields.get(language).value;
			}
			data.type = this.fieldType.selectedIndex;

			Boxes.add(data);

			for (const input of this.fields.values()) {
				input.value = "";
			}
			this.fields.values().next().value.focus();

			return false;
		});

	}

	static finish() {
		this.button.hidden = false;
		this.base.hidden = true;
	}
}
