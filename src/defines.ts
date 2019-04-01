
Array.prototype.min = function <T>(this: Array<T>, indicator?: (t: T) => number): T {
	if (this.length == 0) {
		return null;
	}
	let minI = 0, min = (indicator ? indicator(this[0]) : this[0]);
	for (let i = 1; i < this.length; i++) {
		const value = (indicator ? indicator(this[i]) : this[i]);
		if (value < min) {
			minI = i;
			min = value;
		}
	}
	return this[minI];
}

Array.prototype.remove = function <T>(this: Array<T>, element: T): boolean {
	let index = this.indexOf(element);
	if (index != -1) {
		this.splice(index, 1);
	}
	return index != -1;
}

Array.prototype.removeAt = function <T>(this: Array<T>, index: number): T {
	const result = this.splice(index, 1);
	return result ? result[0] : null;
}

Array.prototype.removeWhere = function <T>(this: Array<T>, predicate: (t: T) => boolean): T[] {
	const ret = [];
	for (let i = 0; i < this.length; i++) {
		if (predicate(this[i])) {
			ret.push(this.removeAt(i--));
		}
	}
	return ret;
}

Set.prototype.first = function <T>(this: Set<T>) {
	return this.values().next().value;
}