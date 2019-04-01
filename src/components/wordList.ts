import { Boxes, BOX_NEW } from "../boxes";
import { Button, capitalize, Div, Header, headers, languages, Table, Th } from "../types";
import { Type, Word } from "../word";

export class WordList {
	static base: Div;
	static title: Div;
	static table: Table;
	static hide: Button;
	static headers: Map<Header, Th>;

	static shownBox: number;
	static sortedHeader: Header;
	static sortedAsc: boolean;

	static init() {

		const prefix = "wordList";

		this.base = document.getElementById(prefix) as Div;
		this.title = document.getElementById(prefix + "Title") as Div;
		this.table = document.getElementById(prefix + "Table") as Table;
		this.hide = document.getElementById(prefix + "Hide") as Button;

		this.headers = new Map<Header, Th>();
		for (const header of headers) {
			const elem = document.getElementById(prefix + "Header" + capitalize(header)) as Th;

			elem.addEventListener("click", () => {
				this.sortBy(header);
			});

			this.headers.set(header, elem);
		}

		this.hide.addEventListener("click", () => {
			this.showBoxContent(-1);
		});

		this.shownBox = -1;
		this.sortedHeader = headers[0];
		this.sortedAsc = true;

		this.refresh();
	}

	static showBoxContent(box: number) {
		if (box == this.shownBox) {
			box = -1;
		}

		this.shownBox = box;

		this.refresh();
	}

	static refresh() {

		if (this.shownBox == -1) {
			this.base.hidden = true;
			return;
		}

		this.base.hidden = false;

		this.title.innerText = "Showing Box: " + Boxes.getName(this.shownBox);

		while (this.table.rows.length > 1) { // keep header row
			this.table.deleteRow(1);
		}

		const currentBox = Boxes.data[this.shownBox].sort((a: Word, b: Word) => {
			const va = a[this.sortedHeader];
			const vb = b[this.sortedHeader];
			return (va < vb ? -1 : 1) * (this.sortedAsc ? 1 : -1);
		});

		for (const word of currentBox) {
			const row = document.createElement("tr");

			row.innerHTML = `<td>${Type[word.type]}</td>`
				+ languages
					.map(language => word[language])
					.map(value => `<td>${value}</td>`)
					.join("\n");

			const actions = document.createElement("td");

			const deleteButton = document.createElement("button");
			deleteButton.innerText = "Delete";
			deleteButton.style.width = "45%";
			deleteButton.addEventListener("click", () => {
				if (confirm(`Are you sure you want to remove ${word.english} from the Database?`)) {
					Boxes.delete(word);
				}
			});
			actions.appendChild(deleteButton);

			if (this.shownBox != BOX_NEW) {
				const resetButton = document.createElement("button");
				resetButton.innerText = "Reset";
				resetButton.style.width = "45%";
				resetButton.style.cssFloat = "right";
				resetButton.addEventListener("click", () => {
					Boxes.move(word, BOX_NEW);
				});
				actions.appendChild(resetButton);
			}

			row.appendChild(actions);

			this.table.appendChild(row);
		}
	}

	static sortBy(header: Header) {
		if (this.sortedHeader == header) {
			this.sortedAsc = !this.sortedAsc;
		} else {
			this.sortedHeader = header;
			this.sortedAsc = true;
		}

		this.refresh();
	}
}
