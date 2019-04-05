import * as firebase from "firebase/app";
import "firebase/firestore";
import { Boxes } from "./boxes";
import { AddWord } from "./components/addWord";
import { Overview } from "./components/overview";
import { TestMe } from "./components/testMe";
import { WordList } from "./components/wordList";
import { Search } from "./components/search";
import "./defines";

{
	const options = {
		authDomain: "datastorage-f3034.firebaseapp.com",
		databaseURL: "https://datastorage-f3034.firebaseio.com",
		projectId: "datastorage-f3034",
		storageBucket: "datastorage-f3034.appspot.com",
		messagingSenderId: "433018122592"
	};
	//@ts-ignore
	const a = "YXBpS2V5,QUl6YVN5Q0U0aXJCeFlLckNaOEVNVFhWc1c2bHRjcTNQbmMwVHlz"; const b = a.split(",").map(atob); options[b[0]] = b[1];
	firebase.initializeApp(options);
}

const firestore = firebase.firestore();
firestore.settings({});


Overview.init();
WordList.init();
TestMe.init();
AddWord.init();
Search.init();
Boxes.init(firestore.collection("nihon"));

declare global {
	interface Array<T> {
		min(indicator?: (t: T) => number): T;
		remove(element: T): boolean;
		removeAt(index: number): T;
		removeWhere(predicate: ((t: T) => boolean)): T[];
	}
	interface Set<T> {
		first(): T;
	}
}