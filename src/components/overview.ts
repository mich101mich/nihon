import { Boxes, BOX_DONE, BOX_NEW } from "../boxes";
import { Div, Table, Td } from "../types";
import { WordList } from "./wordList";

export class Overview {

	static base: Div;
	static table: Table;
	static counts: Td[];

	static init() {

		const prefix = "overview";

		this.base = document.getElementById(prefix) as Div;
		this.table = document.getElementById(prefix + "Table") as Table;

		this.counts = [];
		const nameRow = document.createElement("tr");
		const countRow = document.createElement("tr");
		for (let box = BOX_NEW; box <= BOX_DONE; box++) {

			const showBox = () => {
				WordList.showBoxContent(box);
			};

			const name = document.createElement("th");
			name.innerText = Boxes.getName(box);
			name.addEventListener("click", showBox);
			nameRow.appendChild(name);
			
			const countCell = document.createElement("td");
			countCell.addEventListener("click", showBox);
			countCell.innerText = "?";
			this.counts.push(countCell);
			countRow.appendChild(countCell);
		}
		this.table.appendChild(nameRow);
		this.table.appendChild(countRow);
	}

	static setHidden(hidden: boolean) {
		this.base.hidden = hidden;
	}

	static refresh() {
		for (let box = BOX_NEW; box <= BOX_DONE; box++) {
			this.counts[box].innerText = Boxes.data[box].length.toString();
		}
		WordList.refresh();
	}
}
