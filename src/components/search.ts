import { Input, Div } from "../types";

export class Search {

	static base: Div;
	static box: Input;

	static init() {

		const prefix = "search";

		this.base = document.getElementById(prefix) as Div;
		this.box = document.getElementById(prefix + "Box") as Input;

		this.box.addEventListener("input", event => {
			console.log(this.box.value);
		});
	}
}
