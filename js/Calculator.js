class Calculator {
	static randomIntList(min, max, count, excludeArray) {
		let randoms = [];

		for (let i = min; i < count; i++) {
			while (true) {
				let tmp = Math.floor(Math.random() * (max - min + 1)) + min;
				if (!randoms.includes(tmp) && !excludeArray.includes(tmp)) {
					randoms.push(tmp);
					break;
				}
			}
		}
		return randoms;
	}
}