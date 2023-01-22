export const toggleArrayInsertion = <T>(item: T, arr: T[]) => {
	if (arr.includes(item)) {
		return arr.filter(_item => _item !== item);
	}

	return [...arr, item];
}