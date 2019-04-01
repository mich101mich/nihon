import { AddWord } from "./components/addWord";
import { Overview } from "./components/overview";
import { TestMe } from "./components/testMe";
import { DataBase } from "./types";
import { Data, Word } from "./word";

export const BOX_NEW = 0;
export const BOX_DONE = 9;

export class Boxes {
	static data: Word[][];
	static db: DataBase;

	private constructor() { }

	static getName(index: number) {
		return (index == BOX_NEW ? "new" : (index == BOX_DONE ? "done" : index.toString()));
	}

	static init(db: DataBase) {
		this.data = [];
		for (let i = 0; i <= BOX_DONE; i++) {
			this.data.push([]);
		}

		this.db = db;
		this.refresh();
	}

	static refresh() {
		for (const box of this.data) {
			box.length = 0;
		}
		Boxes.db.get().then(snapshot => {
			snapshot.forEach(doc => {
				const data = doc.data() as Data;
				this.data[Math.min(data.box, BOX_DONE)].push(new Word(doc.id, data));
			});
			Overview.refresh();
			Overview.setHidden(false);
			TestMe.button.disabled = false;
			AddWord.button.disabled = false;
		});
	}

	static add(data: Data) {
		this.db.add(data).then(doc => {
			this.data[BOX_NEW].push(new Word(doc.id, data));
			Overview.refresh();
		});
	}

	static move(word: Word, newBox: number, refresh: boolean = true) {
		this.data[word.box].remove(word);
		word.box = newBox;
		this.data[word.box].push(word);
		const promise = this.db.doc(word.id).update("box", word.box);

		if (refresh) {
			promise.then(() => Overview.refresh());
		}
	}

	static delete(word: Word): any {
		this.data[word.box].remove(word);
		this.db.doc(word.id).delete().then(() => Overview.refresh());
	}
}
